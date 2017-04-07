SELECT users.id, users.tagname, authentication.type ,authentication.auth_id FROM users
JOIN authentication ON users.id = authentication.id
WHERE authentication.type = $1 AND authentication.auth_id = $2