import { relations } from "drizzle-orm/relations";
import { sessionsInAuth, refresh_tokensInAuth, usersInAuth, mfa_factorsInAuth, mfa_challengesInAuth, mfa_amr_claimsInAuth, sso_providersInAuth, saml_providersInAuth, sso_domainsInAuth, saml_relay_statesInAuth, flow_stateInAuth, identitiesInAuth, one_time_tokensInAuth } from "./schema";

export const refresh_tokensInAuthRelations = relations(refresh_tokensInAuth, ({one}) => ({
	sessionsInAuth: one(sessionsInAuth, {
		fields: [refresh_tokensInAuth.session_id],
		references: [sessionsInAuth.id]
	}),
}));

export const sessionsInAuthRelations = relations(sessionsInAuth, ({one, many}) => ({
	refresh_tokensInAuths: many(refresh_tokensInAuth),
	mfa_amr_claimsInAuths: many(mfa_amr_claimsInAuth),
	usersInAuth: one(usersInAuth, {
		fields: [sessionsInAuth.user_id],
		references: [usersInAuth.id]
	}),
}));

export const mfa_factorsInAuthRelations = relations(mfa_factorsInAuth, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [mfa_factorsInAuth.user_id],
		references: [usersInAuth.id]
	}),
	mfa_challengesInAuths: many(mfa_challengesInAuth),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	mfa_factorsInAuths: many(mfa_factorsInAuth),
	sessionsInAuths: many(sessionsInAuth),
	identitiesInAuths: many(identitiesInAuth),
	one_time_tokensInAuths: many(one_time_tokensInAuth),
}));

export const mfa_challengesInAuthRelations = relations(mfa_challengesInAuth, ({one}) => ({
	mfa_factorsInAuth: one(mfa_factorsInAuth, {
		fields: [mfa_challengesInAuth.factor_id],
		references: [mfa_factorsInAuth.id]
	}),
}));

export const mfa_amr_claimsInAuthRelations = relations(mfa_amr_claimsInAuth, ({one}) => ({
	sessionsInAuth: one(sessionsInAuth, {
		fields: [mfa_amr_claimsInAuth.session_id],
		references: [sessionsInAuth.id]
	}),
}));

export const saml_providersInAuthRelations = relations(saml_providersInAuth, ({one}) => ({
	sso_providersInAuth: one(sso_providersInAuth, {
		fields: [saml_providersInAuth.sso_provider_id],
		references: [sso_providersInAuth.id]
	}),
}));

export const sso_providersInAuthRelations = relations(sso_providersInAuth, ({many}) => ({
	saml_providersInAuths: many(saml_providersInAuth),
	sso_domainsInAuths: many(sso_domainsInAuth),
	saml_relay_statesInAuths: many(saml_relay_statesInAuth),
}));

export const sso_domainsInAuthRelations = relations(sso_domainsInAuth, ({one}) => ({
	sso_providersInAuth: one(sso_providersInAuth, {
		fields: [sso_domainsInAuth.sso_provider_id],
		references: [sso_providersInAuth.id]
	}),
}));

export const saml_relay_statesInAuthRelations = relations(saml_relay_statesInAuth, ({one}) => ({
	sso_providersInAuth: one(sso_providersInAuth, {
		fields: [saml_relay_statesInAuth.sso_provider_id],
		references: [sso_providersInAuth.id]
	}),
	flow_stateInAuth: one(flow_stateInAuth, {
		fields: [saml_relay_statesInAuth.flow_state_id],
		references: [flow_stateInAuth.id]
	}),
}));

export const flow_stateInAuthRelations = relations(flow_stateInAuth, ({many}) => ({
	saml_relay_statesInAuths: many(saml_relay_statesInAuth),
}));

export const identitiesInAuthRelations = relations(identitiesInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [identitiesInAuth.user_id],
		references: [usersInAuth.id]
	}),
}));

export const one_time_tokensInAuthRelations = relations(one_time_tokensInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [one_time_tokensInAuth.user_id],
		references: [usersInAuth.id]
	}),
}));