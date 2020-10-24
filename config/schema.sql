\c erasmus-test;

--
-- Name: Organisation; Type: TABLE; Schema: public; 
--

CREATE TABLE public."Organisation" (
    id integer NOT NULL,
    country text,
    description text,
    name text,
    owner integer
);

--
-- Name: Organisation_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public."Organisation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public."Organisation_id_seq" OWNED BY public."Organisation".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public."User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: User; Type: TABLE; Schema: public;
--

CREATE TABLE public."User" (
    id integer DEFAULT nextval('public."User_id_seq"'::regclass) NOT NULL,
    name text,
    password text NOT NULL,
    email text NOT NULL
);


--
-- Name: user_sequence; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: Organisation id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public."Organisation" ALTER COLUMN id SET DEFAULT nextval('public."Organisation_id_seq"'::regclass);

--
-- Name: Organisation Organisation_pkey; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public."Organisation"
    ADD CONSTRAINT "Organisation_pkey" PRIMARY KEY (id);


--
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Organisation owner_key; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public."Organisation"
    ADD CONSTRAINT owner_key FOREIGN KEY (owner) REFERENCES public."Organisation"(id) ON UPDATE CASCADE ON DELETE CASCADE;

