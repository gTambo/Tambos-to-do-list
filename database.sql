CREATE TABLE tasks (
				"id" SERIAL PRIMARY KEY,
				"task" VARCHAR (562) NOT NULL,
				"isComplete" BOOLEAN DEFAULT FALSE,
				"whenCompleted" VARCHAR (128)
				);

INSERT INTO "tasks" 
			("task")
VALUES
	('mock-up to do item, fill in database.sql file'),
	('create input fields for new task, and add button'),
	('server POST route for new task'),
	('client POST route for new task'),
	('server GET route for all task'),
	('client GET route for all tasks'),
	('append tasks to the DOM (remember fields for delete and completed)'),
	('create delete button'),
	('server DELETE route'),
	('client DELETE route'),
	('create completed button'),
	('create server PUT route for isCompleted'),
	('create client PUT route for isCompleted'),
	('click event for delete'),
	('click event for complete'),
	('general styling - find a neat font or two'),
	('completed button styling');