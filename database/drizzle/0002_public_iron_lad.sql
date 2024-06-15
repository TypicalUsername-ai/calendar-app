-- Custom SQL migration file, put you code below! --
ALTER TABLE api.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_access_own ON api.events TO client USING events.owner = auth.uid();
GRANT ALL ON api.events TO client;
NOTIFY pgrst;
