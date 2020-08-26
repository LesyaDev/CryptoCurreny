CREATE DATABASE ubicoin
OWNER postgres
TABLESPACE pg_default;
--
-- Type: TABLE ; Name: user; Owner: postgres
--

CREATE TABLE "user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "isAdmin" boolean NOT NULL,
    "userCoinId" integer
);

ALTER TABLE public."user" ALTER id SET DEFAULT nextval('user_id_seq'::regclass);
ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
  UNIQUE (email);
ALTER TABLE "user" ADD CONSTRAINT "REL_1870c2d860e66dd9f0e36fa37b"
  UNIQUE ("userCoinId");
ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
  PRIMARY KEY (id);
ALTER TABLE "user" ADD CONSTRAINT "FK_1870c2d860e66dd9f0e36fa37b3"
  FOREIGN KEY ("userCoinId") REFERENCES user_coin(id);
ALTER TABLE "user" OWNER TO postgres;


--
-- Type: TABLE ; Name: coin; Owner: postgres
--

CREATE TABLE coin (
    id integer NOT NULL,
    value integer NOT NULL,
    total integer NOT NULL
);


ALTER TABLE public.coin ALTER id SET DEFAULT nextval('coin_id_seq'::regclass);

ALTER TABLE coin ADD CONSTRAINT "PK_650993fc71b789e4793b62fbcac"
  PRIMARY KEY (id);

ALTER TABLE coin OWNER TO postgres;


CREATE TABLE migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations ALTER id SET DEFAULT nextval('migrations_id_seq'::regclass);

ALTER TABLE migrations ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be"
  PRIMARY KEY (id);

ALTER TABLE migrations OWNER TO postgres;


CREATE TABLE user_coin (
    id integer NOT NULL,
    value integer NOT NULL,
    "coinIdId" integer,
    "currentOwnerId" integer
);


ALTER TABLE public.user_coin ALTER id SET DEFAULT nextval('user_coin_id_seq'::regclass);

ALTER TABLE user_coin ADD CONSTRAINT "REL_d9c3c63318ff2c2aab16d2182b"
  UNIQUE ("currentOwnerId");
ALTER TABLE user_coin ADD CONSTRAINT "PK_b8f87a8dac81c162f17b996afa2"
  PRIMARY KEY (id);
ALTER TABLE user_coin ADD CONSTRAINT "FK_788c3c0c5ef0c76c8194fcf9d34"
  FOREIGN KEY ("coinIdId") REFERENCES coin(id);
ALTER TABLE user_coin ADD CONSTRAINT "FK_d9c3c63318ff2c2aab16d2182b1"
  FOREIGN KEY ("currentOwnerId") REFERENCES "user"(id);

ALTER TABLE user_coin OWNER TO postgres;


CREATE TABLE user_coin_audit (
    id integer NOT NULL,
    value integer NOT NULL,
    total integer NOT NULL,
    date timestamp without time zone NOT NULL,
    "idUserCoinId" integer
);


ALTER TABLE public.user_coin_audit ALTER id SET DEFAULT nextval('user_coin_audit_id_seq'::regclass);
ALTER TABLE public.user_coin_audit ALTER date SET DEFAULT now();

ALTER TABLE user_coin_audit ADD CONSTRAINT "PK_90c0e341ccbfa900d0abba24553"
  PRIMARY KEY (id);
ALTER TABLE user_coin_audit ADD CONSTRAINT "FK_60647f8840b611876fedc0be40c"
  FOREIGN KEY ("idUserCoinId") REFERENCES user_coin(id);

ALTER TABLE user_coin_audit OWNER TO postgres;
