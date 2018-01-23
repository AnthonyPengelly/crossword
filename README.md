# Crossword

## DB setup
```
mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'crossword'@'localhost' IDENTIFIED BY 'database_password'
# Exit
\q
mysql -u crossword -p
CREATE DATABASE crossword;
# Exit
\q
```