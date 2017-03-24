SELECT threads.creator, threads.title, threads.created_time, thread_conversations.created_time FROM threads WHERE section_id = $1
JOIN thread_conversations ON threads.id = thread_conversations.thread_id
ORDER BY thread_conversations.created_time