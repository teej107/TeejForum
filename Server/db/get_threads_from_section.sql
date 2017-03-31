SELECT threads.id, users.tagname, threads.title, FORMAT_DATE(threads.created_time) AS created_time FROM threads
JOIN users ON users.id = threads.creator
WHERE threads.section_id = $1 ORDER BY created_time DESC