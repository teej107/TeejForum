UPDATE users SET tagname = $2, firstname = $3, lastname = $4, avatar = $5
WHERE id = $1
RETURN *