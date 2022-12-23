--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: eduarda
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO eduarda;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: eduarda
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    user_id integer NOT NULL,
    status boolean DEFAULT false NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sessions OWNER TO eduarda;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: eduarda
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO eduarda;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eduarda
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: eduarda
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    shorturl character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    visitcount bigint DEFAULT 0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL
);


ALTER TABLE public.urls OWNER TO eduarda;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: eduarda
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO eduarda;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eduarda
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: eduarda
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO eduarda;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: eduarda
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO eduarda;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eduarda
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: eduarda
--

COPY public.sessions (id, token, user_id, status, createdat) FROM stdin;
1	e36eae4e-8dd3-41c1-8f84-ccecda46b1d9	3	t	2022-12-22 01:48:10.925
2	af867b9c-f28a-4b28-8cd2-fa07c335e2b9	3	t	2022-12-22 01:48:23.814
3	d1edcf12-d269-4aac-a735-1919a71baa2c	2	t	2022-12-22 02:37:25.88
4	7a1842fc-a3dd-43e8-98e5-396f4a5780e7	4	t	2022-12-22 19:40:10.327
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: eduarda
--

COPY public.urls (id, shorturl, url, visitcount, createdat, user_id) FROM stdin;
1	6lmik7pkdxuavrvbyeqzu	https://www.google.com	5	2022-12-22 02:46:00.697	3
2	yxxogvcyaayevopfi8zwc	https://www.google.com	4	2022-12-22 02:46:08.896	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: eduarda
--

COPY public.users (id, name, email, password) FROM stdin;
2	Elisson	mail@mail.com	$2b$12$F/5QxU2H85JlzE3WFl52VOcazkC5kZ7jaxMg.9iep2jzs2di84uIW
3	Elisson	mail2@mail.com	$2b$12$k9MSgL.YNjplcWUm.4qYhebnmt395.fG.MoySYWKht7DtgI9OsG12
4	Eduarda 3	mail3@mail.com	$2b$12$Zy4shpuoMWEilB/ENxmXFOWJueav9ZeJII69C2LoL91H6ujwgBopa
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eduarda
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eduarda
--

SELECT pg_catalog.setval('public.urls_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eduarda
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: urls unique_short_url; Type: CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT unique_short_url UNIQUE (shorturl);


--
-- Name: sessions unique_token; Type: CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT unique_token UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eduarda
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO eduarda;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO eduarda;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO eduarda;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO eduarda;


--
-- PostgreSQL database dump complete
--

