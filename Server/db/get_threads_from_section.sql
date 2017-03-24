SELECT users.tagname, threads.title, TO_CHAR(threads.created_time, 'MM/DD/YYYY HH:MM:SS') AS created_time FROM threads
JOIN users ON users.id = threads.creator
WHERE threads.section_id = $1