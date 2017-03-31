SELECT users.tagname, threads.title, threads.body, FORMAT_DATE(threads.created_time) FROM threads
JOIN users ON users.id = threads.creator
WHERE threads.id = $1