-- Extensions
create extension if not exists pgcrypto;
create extension if not exists btree_gist;

-- Enums
create type booking_status as enum ('confirmed', 'checked_in', 'checked_out', 'cancelled');
create type channel_type   as enum ('ota', 'direct', 'messaging', 'phone', 'walkin');
create type sync_method    as enum ('ical', 'manual', 'direct_engine');
create type staff_role     as enum ('owner', 'staff');
