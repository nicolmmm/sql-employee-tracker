

INSERT INTO department (id, dept_name)
VALUES  (1, "Engineering"),
        (2, "Legal"),
        (3, "Finance"),
        (4, "Sales");


INSERT INTO roles (id, title, dept_id, salary )
VALUES  (1, "Sales Lead", "Sales", 100000.0),
        (2, "Salesperson", "Sales", 100000.0),
        (3, "Lead Engineer", "Engineering", 100000.0),
        (4, "Software Engineer", "Engineering", 100000.0),
        (5, "Account Manager","Finance",100000.0),
        (6, "Accountant","Finance",100000.0),
        (7, "Legal Team Lead","Legal",100000.0),
        (8, "Lawyer", "Legal", 100000.0);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Joe", "Sells", 1, NULL),
        (2, "Selly", "Wells", 2, 1),
        (3, "Bob", "Boolder", 3, NULL),
        (4, "Robert", "Chords", 4, 3),
        (5, "Matthew","Pretz",5, NULL),
        (6, "Axcel","Table",6, 5),
        (7, "Theo","Mann",7, NULL),
        (8, "Lea", "Gaul", 8, 7);



/* 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Joe", "Sells", "1", "5"),
        (2, "Salesperson", "Sales", "75000"),
        (3, "Lead Engineer", "Engineering", "200000"),
        (4, "Software Engineer", "Engineering", "120000"),
        (5, "Account Manager","Finance","160000"),
        (6, "Accountant","Finance","125000"),
        (7, "Legal Team Lead","Legal","250000"),
        (8, "Lawyer", "Legal", "190000"); */