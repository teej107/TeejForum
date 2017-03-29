SELECT users.tagname, thread_conversations.content, thread_conversations.created_time
FROM thread_conversations JOIN users ON users.id = thread_conversations.users
WHERE thread_conversations.thread_id = $1
ORDER BY thread_conversations.created_time