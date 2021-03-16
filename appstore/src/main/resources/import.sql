-- AUTHORITY

INSERT INTO authority(`name`, create_at, update_at) VALUES('ADMIN', NOW(), NOW());
INSERT INTO authority(`name`, create_at, update_at) VALUES('USER', NOW(), NOW());

-- USER

INSERT INTO user_app(`email`, `password`, `fullname`,`enabled`, `restore_password`, create_at, update_at)  VALUES('henrymosquera.perez@gmail.com', '{bcrypt}$2a$10$OMTvsqnAnSiAja3pPD3oGujv/RtSnWwqrj/f5Yz3pelBt6fpBuQm.', 'HENRY MOSQUERA', true,'e5c94be4-9cfc-4b20-9122-ecddc06d22f2' , NOW(), NOW());

-- USER_AUTHORITY

INSERT INTO user_authority(`user_id`, authority_id ) VALUES(1, 1);
INSERT INTO user_authority(`user_id`, authority_id ) VALUES(1, 2);


-- PAYMENT

INSERT INTO payment(`name`, create_at, update_at ) VALUES('EN LINEA', NOW(), NOW());
INSERT INTO payment(`name`, create_at, update_at ) VALUES('CONTRA ENTREGA', NOW(), NOW());

-- CATEGORY

INSERT INTO category(code, `name`, create_at, update_at) VALUES('COD1', 'HAMBURGUESAS', NOW(), NOW());
INSERT INTO category(code, `name`, create_at, update_at) VALUES('COD2', 'BEBIDAS', NOW(), NOW());

-- STATE

INSERT INTO state(code, `name`, create_at, update_at) VALUES('COD1', 'PEDIDO', NOW(), NOW());
INSERT INTO state(code, `name`, create_at, update_at) VALUES('COD2', 'EN PREPARACION', NOW(), NOW());
INSERT INTO state(code, `name`, create_at, update_at) VALUES('COD3', 'ENVIADO', NOW(), NOW());
INSERT INTO state(code, `name`, create_at, update_at) VALUES('COD4', 'RECIBIDO', NOW(), NOW());

