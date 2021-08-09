CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;

CREATE TABLE personas(
  id varchar PRIMARY KEY not null,
  primer_nombre varchar not null,
  segundo_nombre varchar default '',
  area varchar default '',
  primer_apellido varchar not null,
  otros_nombres varchar,
  segundo_apellido varchar not null,
  enable_person boolean not null DEFAULT true,
  email varchar not null,
  pais varchar not null,
  date_int TIMESTAMP not null,
  numero_identificacion varchar not null,
  tipo_identificacion integer not null,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON personas
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE personas_id_seq OWNED BY personas.id;
ALTER sequence personas_id_seq INCREMENT BY 1; 
ALTER TABLE personas ALTER COLUMN id SET DEFAULT nextval('personas_id_seq'::regclass);

CREATE INDEX "index_personas_on_email" on personas(email);

alter table personas  add constraint UQ_personas_email  unique (email);
alter table personas  add constraint UQ_personas_identification  unique (numero_identificacion);

CREATE TABLE admins(  
  id varchar PRIMARY KEY not null,
  nikename varchar not null,
  email varchar not null,
  admin_type varchar not null,
  avatar varchar DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON admins
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE admins_id_seq OWNED BY admins.id;
ALTER sequence admins_id_seq INCREMENT BY 1; 
ALTER TABLE admins ALTER COLUMN id SET DEFAULT nextval('admins_id_seq'::regclass);
alter table personas  add constraint UQ_admins_email  unique (email);

CREATE TABLE authentications(
  id varchar PRIMARY KEY not null,
  admin_id varchar,
  encrypted_password varchar not null default '',
  email varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY(admin_id)
     REFERENCES admins(id)
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON authentications
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE authentications_id_seq OWNED BY authentications.id;
ALTER sequence authentications_id_seq INCREMENT BY 1; 

ALTER TABLE authentications ALTER COLUMN id SET DEFAULT nextval('authentications_id_seq'::regclass);

CREATE INDEX "index_authentications_admins_id" on authentications(admin_id);

CREATE TABLE codes(
      id varchar PRIMARY KEY not null,
      code varchar not null,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE SEQUENCE codes_id_seq OWNED BY codes.id;
ALTER sequence codes_id_seq INCREMENT BY 1; 

CREATE INDEX "index_codes_id" on codes(id);





