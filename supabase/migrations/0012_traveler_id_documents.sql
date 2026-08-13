-- Allow multiple ID documents (photos or PDFs) per traveler, instead of the
-- single id_card_path this shipped with in 0010. A traveler may legitimately
-- have a front+back ID scan, or a passport photo + visa page, etc.

alter table guest_checkin_travelers add column id_card_paths text[] not null default '{}';
update guest_checkin_travelers set id_card_paths = array[id_card_path];
alter table guest_checkin_travelers
  add constraint guest_checkin_travelers_id_card_paths_check check (cardinality(id_card_paths) > 0);
alter table guest_checkin_travelers drop column id_card_path;

alter table guests add column id_card_paths text[] not null default '{}';
update guests set id_card_paths = array[id_card_path] where id_card_path is not null;
alter table guests drop column id_card_path;
