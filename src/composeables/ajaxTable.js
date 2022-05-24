import {ref} from "vue";
import {apiNode} from "../plugins/http";
import {Dialog} from 'quasar'


export function useAjaxTable(url, updateUrl, options) {

    const idColumn = options.idColumn || 'id';
    const rows = ref([]);
    const columns = ref([]);
    const fetchData = () => {
        apiNode.get(url).then(res => {
            const {data} = res.data;

            if (options && options.dateColumns) {
                data.forEach(item => {
                    Object.keys(item).forEach((key) => {
                        if (options.dateColumns.includes(key)) {
                            item[key] = item[key].slice(0, 10);
                        }
                    });
                });
            }

            rows.value = data;
            columns.value = Object.keys(data[0]).map(k => ({
                name: k,
                label: k,
                field: k
            }));

            columns.value.push({
                name: 'actions',
                label: 'Actions',
                field: 'actions',
                sortable: false,
                width: '100px'
            });
        });
    }
    const rowToEdit = ref({});
    const rowToDelete = ref({});
    const rowBeforeEdit = ref({});
    const showEditDialog = ref(false);

    const editRow = (props) => {
        console.log(props);
        rowToEdit.value = props.row;
        rowBeforeEdit.value = JSON.parse(JSON.stringify(props.row));
        showEditDialog.value = true;
    };

    const deleteRow = (props) => {
        rowToDelete.value = props.row;
        apiNode.delete(updateUrl + '/' + props.row[idColumn]).then(res => {
            const {success, message} = res.data;
            Dialog.create({
                title: success ? "Success" : "Error",
                message: message,
                color: success ? "positive" : "negative"
            })
            success && fetchData();
        });
    };

    const updateRow = () => {
        console.log(rowToEdit.value);
        apiNode.put(updateUrl + '/' + rowToEdit.value.id, rowToEdit.value).then(res => {
            console.log(res);
            if (res.status === 200 && res.data.success) {
                const {success, message} = res.data;
                Dialog.create({
                    title: success ? "Success" : "Error",
                    message: message,
                    color: success ? "positive" : "negative"
                })
            }
        }).catch(err => {
            console.log(err);
            const idColumnName = options.idColumnName || 'id';
            rows.value = rows.value.map(obj => {
                if (obj[idColumnName] === rowToEdit.value[idColumnName]) {
                    return rowBeforeEdit.value;
                }
                return obj;
            })
        });

    };

    const confirmDelete = function (props) {
        Dialog.create({
            title: 'Confirm',
            message: 'Delete this row?',
            cancel: true,
        }).onOk(() => {
            deleteRow(props);
        }).onCancel(() => {
            // console.log('>>>> Cancel')
        }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
        })
    }

    return {
        rows,
        columns,
        rowToEdit,
        rowBeforeEdit,
        showEditDialog,
        editRow,
        deleteRow,
        updateRow,
        fetchData,
        confirmDelete
    };
}