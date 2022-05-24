
SELECT * FROM dnb.tts.tasks;

alter table tts.tasks
    alter column task_plan_start_date type date using task_plan_start_date::date;