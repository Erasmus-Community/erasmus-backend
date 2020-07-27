--
-- PostgreSQL database dump
--

-- Dumped from database version 11.8
-- Dumped by pg_dump version 11.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: management; Type: SCHEMA; Schema: -; Owner: pcardoso
--

CREATE SCHEMA management;


ALTER SCHEMA management OWNER TO pcardoso;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: CloudSecret; Type: TABLE; Schema: management; Owner: pcardoso
--

CREATE TABLE management."CloudSecret" (
    secret character varying(255) NOT NULL
);


ALTER TABLE management."CloudSecret" OWNER TO pcardoso;

--
-- Name: InternalMigration; Type: TABLE; Schema: management; Owner: pcardoso
--

CREATE TABLE management."InternalMigration" (
    id character varying(255) NOT NULL,
    "appliedAt" timestamp without time zone NOT NULL
);


ALTER TABLE management."InternalMigration" OWNER TO pcardoso;

--
-- Name: Migration; Type: TABLE; Schema: management; Owner: pcardoso
--

CREATE TABLE management."Migration" (
    "projectId" character varying(200) DEFAULT ''::character varying NOT NULL,
    revision integer DEFAULT 1 NOT NULL,
    schema text,
    functions text,
    status character varying(20) DEFAULT 'PENDING'::character varying NOT NULL,
    applied integer DEFAULT 0 NOT NULL,
    "rolledBack" integer DEFAULT 0 NOT NULL,
    steps text,
    errors text,
    "startedAt" timestamp without time zone,
    "finishedAt" timestamp without time zone,
    datamodel text,
    CONSTRAINT "Migration_status_check" CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'IN_PROGRESS'::character varying, 'SUCCESS'::character varying, 'ROLLING_BACK'::character varying, 'ROLLBACK_SUCCESS'::character varying, 'ROLLBACK_FAILURE'::character varying])::text[])))
);


ALTER TABLE management."Migration" OWNER TO pcardoso;

--
-- Name: Project; Type: TABLE; Schema: management; Owner: pcardoso
--

CREATE TABLE management."Project" (
    id character varying(200) DEFAULT ''::character varying NOT NULL,
    secrets text,
    "allowQueries" boolean DEFAULT true NOT NULL,
    "allowMutations" boolean DEFAULT true NOT NULL,
    functions text
);


ALTER TABLE management."Project" OWNER TO pcardoso;

--
-- Name: TelemetryInfo; Type: TABLE; Schema: management; Owner: pcardoso
--

CREATE TABLE management."TelemetryInfo" (
    id character varying(255) NOT NULL,
    "lastPinged" timestamp without time zone
);


ALTER TABLE management."TelemetryInfo" OWNER TO pcardoso;

--
-- Name: Organisation; Type: TABLE; Schema: public; Owner: pcardoso
--

CREATE TABLE public."Organisation" (
    id integer NOT NULL,
    country text,
    description text,
    name text,
    owner integer
);


ALTER TABLE public."Organisation" OWNER TO pcardoso;

--
-- Name: Organisation_id_seq; Type: SEQUENCE; Schema: public; Owner: pcardoso
--

CREATE SEQUENCE public."Organisation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Organisation_id_seq" OWNER TO pcardoso;

--
-- Name: Organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pcardoso
--

ALTER SEQUENCE public."Organisation_id_seq" OWNED BY public."Organisation".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: pcardoso
--

CREATE SEQUENCE public."User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO pcardoso;

--
-- Name: User; Type: TABLE; Schema: public; Owner: pcardoso
--

CREATE TABLE public."User" (
    id integer DEFAULT nextval('public."User_id_seq"'::regclass) NOT NULL,
    name text,
    password text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public."User" OWNER TO pcardoso;

--
-- Name: user_sequence; Type: SEQUENCE; Schema: public; Owner: pcardoso
--

CREATE SEQUENCE public.user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_sequence OWNER TO pcardoso;

--
-- Name: Organisation id; Type: DEFAULT; Schema: public; Owner: pcardoso
--

ALTER TABLE ONLY public."Organisation" ALTER COLUMN id SET DEFAULT nextval('public."Organisation_id_seq"'::regclass);


--
-- Name: CloudSecret CloudSecret_pkey; Type: CONSTRAINT; Schema: management; Owner: pcardoso
--

ALTER TABLE ONLY management."CloudSecret"
    ADD CONSTRAINT "CloudSecret_pkey" PRIMARY KEY (secret);


--
-- Name: InternalMigration InternalMigration_pkey; Type: CONSTRAINT; Schema: management; Owner: pcardoso
--

ALTER TABLE ONLY management."InternalMigration"
    ADD CONSTRAINT "InternalMigration_pkey" PRIMARY KEY (id);


--
-- Name: Migration Migration_pkey; Type: CONSTRAINT; Schema: management; Owner: pcardoso
--

ALTER TABLE ONLY management."Migration"
    ADD CONSTRAINT "Migration_pkey" PRIMARY KEY ("projectId", revision);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: management; Owner: pcardoso
--

ALTER TABLE ONLY management."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: TelemetryInfo TelemetryInfo_pkey; Type: CONSTRAINT; Schema: management; Owner: pcardoso
--

ALTER TABLE ONLY management."TelemetryInfo"
    ADD CONSTRAINT "TelemetryInfo_pkey" PRIMARY KEY (id);


--
-- Name: Organisation Organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: pcardoso
--

ALTER TABLE ONLY public."Organisation"
    ADD CONSTRAINT "Organisation_pkey" PRIMARY KEY (id);


--
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: pcardoso
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: pcardoso
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Migration migrations_projectid_foreign; Type: FK CONSTRAINT; Schema: management; Owner: pcardoso
--

ALTER TABLE ONLY management."Migration"
    ADD CONSTRAINT migrations_projectid_foreign FOREIGN KEY ("projectId") REFERENCES management."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Organisation owner_key; Type: FK CONSTRAINT; Schema: public; Owner: pcardoso
--

ALTER TABLE ONLY public."Organisation"
    ADD CONSTRAINT owner_key FOREIGN KEY (owner) REFERENCES public."Organisation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

