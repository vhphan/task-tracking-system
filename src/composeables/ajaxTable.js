import {ref} from "vue";
import {apiNode} from "../plugins/http";


export function useAjaxTable(url, updateUrl, options) {

    const rows = ref([]);
    const columns = ref([]);
    const fetchData = () => {
        apiNode.get(url).then(res => {
            const {data} = res.data;
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
    const rowBeforeEdit = ref({});
    const showEditDialog = ref(false);
    const editRow = (props) => {
        console.log(props);
        rowBeforeEdit.value = props.row;
        rowToEdit.value = props.row;
        showEditDialog.value = true;
    };
    const deleteRow = (props) => {
        console.log(props);
    };
    const updateRow = () => {
        console.log(rowToEdit.value);

        apiNode.put(updateUrl + '/' + rowToEdit.value.id, rowToEdit.value).then(res => {
            console.log(res);
            if (res.status === 200 && res.data.success) {
                const {success, message} = res.data;
                $q.dialog({
                    title: success ? "Success" : "Error",
                    message: message,
                    color: success ? "positive" : "negative"
                })
            }
        }).catch(err => {
            console.log(err);
            rowToEdit.value = rowBeforeEdit.value;
        });

    };
    return {rows, columns, rowToEdit, rowBeforeEdit, showEditDialog, editRow, deleteRow, updateRow, fetchData};
}