-- HMS leads: phone number fixes from the online check on 29 Sep 2026.
-- Found numbers go first (so the WhatsApp queue uses them); original numbers are kept after them.
-- Phone updates only apply where the phone is still the original value, so manual edits are not overwritten.
-- Each lead gets a dated note saying what changed and where the number came from.
-- Safe to run more than once: notes are only added once.

begin;

-- Garud Boys Hostel (New Baneshwor, Kathmandu)
update public.hms_leads set phone = '+977 984-2342197, +977 981-2058418', whatsapp_viber = NULL
where id = '01b0c3f9-c6ba-4e95-a855-b620c1158165' and phone is not distinct from '+977 981-2058418';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9842342197; moved it first. Original number kept after it.')
where id = '01b0c3f9-c6ba-4e95-a855-b620c1158165' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 984-2342197, +977 981-2058418';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9842342197; moved it first. Original number kept after it. (Not applied: the phone had already been edited.)')
where id = '01b0c3f9-c6ba-4e95-a855-b620c1158165' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 984-2342197, +977 981-2058418';

-- Lilly Girls Hostel (New Baneshwor, Kathmandu)
update public.hms_leads set phone = '+977 982-5742130, +977 984-2954845, +977 981-9349137', whatsapp_viber = NULL
where id = '8067a209-ad80-421f-a3ad-a90ea7f9ef4a' and phone is not distinct from '+977 981-9349137';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9825742130 / 9842954845; moved them first. Original number kept after them.')
where id = '8067a209-ad80-421f-a3ad-a90ea7f9ef4a' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 982-5742130, +977 984-2954845, +977 981-9349137';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9825742130 / 9842954845; moved them first. Original number kept after them. (Not applied: the phone had already been edited.)')
where id = '8067a209-ad80-421f-a3ad-a90ea7f9ef4a' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 982-5742130, +977 984-2954845, +977 981-9349137';

-- New Hill Boys Hostel (New Baneshwor, Kathmandu)
update public.hms_leads set phone = '+977 984-3284724, +977 984-1313288, +977 981-8350926', whatsapp_viber = NULL
where id = 'd7864e51-b66a-461b-a8fa-061cb16af8b4' and phone is not distinct from '+977 984-1313288, +977 981-8350926';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com and shikshasanjal.com list 9843284724; moved it first. Original numbers kept after it.')
where id = 'd7864e51-b66a-461b-a8fa-061cb16af8b4' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 984-3284724, +977 984-1313288, +977 981-8350926';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com and shikshasanjal.com list 9843284724; moved it first. Original numbers kept after it. (Not applied: the phone had already been edited.)')
where id = 'd7864e51-b66a-461b-a8fa-061cb16af8b4' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 984-3284724, +977 984-1313288, +977 981-8350926';

-- Baneshwor Girls Hostel (New Baneshwor, Kathmandu)
update public.hms_leads set phone = '+977 980-3112567, +977 984-1458018', whatsapp_viber = NULL
where id = '27cdc869-a0a5-47d3-acdb-2eb9c213446b' and phone is not distinct from '+977 984-1458018';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9803112567; moved it first. Original number kept after it.')
where id = '27cdc869-a0a5-47d3-acdb-2eb9c213446b' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 980-3112567, +977 984-1458018';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9803112567; moved it first. Original number kept after it. (Not applied: the phone had already been edited.)')
where id = '27cdc869-a0a5-47d3-acdb-2eb9c213446b' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 980-3112567, +977 984-1458018';

-- Radiant Girls Hostel - Putalisadak (Putalisadak, Kathmandu)
update public.hms_leads set phone = '+977 981-8115122, +977 986-1030982', whatsapp_viber = NULL
where id = 'b6bba3ce-7bc4-4941-aa5c-0b0910960f05' and phone is not distinct from '+977 986-1030982';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: the hostel''s own site (radiantgirlshostel.com.np) gives 9818115122 for the Putalisadak branch; moved it first.')
where id = 'b6bba3ce-7bc4-4941-aa5c-0b0910960f05' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 981-8115122, +977 986-1030982';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: the hostel''s own site (radiantgirlshostel.com.np) gives 9818115122 for the Putalisadak branch; moved it first. (Not applied: the phone had already been edited.)')
where id = 'b6bba3ce-7bc4-4941-aa5c-0b0910960f05' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 981-8115122, +977 986-1030982';

-- Image Girls Hostel (Putalisadak, Kathmandu)
update public.hms_leads set phone = '+977 984-9978598, +977 985-1228598', whatsapp_viber = NULL
where id = '57ab92f2-d5a5-4a42-a569-d38cd1eedf59' and phone is not distinct from '+977 985-1228598';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9849978598; moved it first. Original number kept after it.')
where id = '57ab92f2-d5a5-4a42-a569-d38cd1eedf59' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 984-9978598, +977 985-1228598';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9849978598; moved it first. Original number kept after it. (Not applied: the phone had already been edited.)')
where id = '57ab92f2-d5a5-4a42-a569-d38cd1eedf59' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 984-9978598, +977 985-1228598';

-- Shree Narayani Girls Hostel (Putalisadak, Kathmandu)
update public.hms_leads set phone = '+977 984-1716912, +977 981-3426361, +977 986-6221609', whatsapp_viber = NULL
where id = 'cbc2236b-8af3-4ce6-a19b-b2c5c036526e' and phone is not distinct from '+977 986-6221609';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9841716912 / 9813426361; moved them first. Original number kept after them.')
where id = 'cbc2236b-8af3-4ce6-a19b-b2c5c036526e' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 984-1716912, +977 981-3426361, +977 986-6221609';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9841716912 / 9813426361; moved them first. Original number kept after them. (Not applied: the phone had already been edited.)')
where id = 'cbc2236b-8af3-4ce6-a19b-b2c5c036526e' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 984-1716912, +977 981-3426361, +977 986-6221609';

-- KTM Valley Girls Hostel (Dillibazar, Kathmandu)
update public.hms_leads set phone = '+977 986-0608503, +977 980-8575761, +977 984-3390714', whatsapp_viber = NULL
where id = 'f8f1c7c1-4e65-4d2b-aa70-b070c70597e5' and phone is not distinct from '+977 984-3390714';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists New Valley / KTM Valley Girls Hostel as 9860608503 / 9808575761; moved them first. Original number kept after them.')
where id = 'f8f1c7c1-4e65-4d2b-aa70-b070c70597e5' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 986-0608503, +977 980-8575761, +977 984-3390714';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists New Valley / KTM Valley Girls Hostel as 9860608503 / 9808575761; moved them first. Original number kept after them. (Not applied: the phone had already been edited.)')
where id = 'f8f1c7c1-4e65-4d2b-aa70-b070c70597e5' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 986-0608503, +977 980-8575761, +977 984-3390714';

-- Supreme Pulchowk Boys Hostel (Pulchowk, Lalitpur)
update public.hms_leads set phone = '+977 982-3767979, +977 980-6062278', whatsapp_viber = NULL
where id = 'dbbcd3f3-80ac-4a04-aaa5-ac3bab5a8083' and phone is not distinct from '+977 980-6062278';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9823767979; moved it first. Original number kept after it.')
where id = 'dbbcd3f3-80ac-4a04-aaa5-ac3bab5a8083' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 982-3767979, +977 980-6062278';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9823767979; moved it first. Original number kept after it. (Not applied: the phone had already been edited.)')
where id = 'dbbcd3f3-80ac-4a04-aaa5-ac3bab5a8083' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 982-3767979, +977 980-6062278';

-- Mid Town Boys Hostel Block A (Thasikhel / Jawalakhel, Lalitpur)
update public.hms_leads set phone = '+977 986-1563792, +977 985-1167133', whatsapp_viber = NULL
where id = '3de022c8-4bba-445f-a2e4-41bca50d2f49' and phone is not distinct from '+977 985-1167133';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9861563792; moved it first. Original number kept after it.')
where id = '3de022c8-4bba-445f-a2e4-41bca50d2f49' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 986-1563792, +977 985-1167133';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9861563792; moved it first. Original number kept after it. (Not applied: the phone had already been edited.)')
where id = '3de022c8-4bba-445f-a2e4-41bca50d2f49' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 986-1563792, +977 985-1167133';

-- Supreme Boys Hostel (Kalanki, Kathmandu)
update public.hms_leads set phone = '+977 985-7837819, +977 982-9510968, +977 984-7945736', whatsapp_viber = NULL
where id = '66f6a82d-0f71-4278-a41f-fb58162ec604' and phone is not distinct from '+977 984-7945736';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9857837819 / 9829510968; moved them first. Original number kept after them.')
where id = '66f6a82d-0f71-4278-a41f-fb58162ec604' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 985-7837819, +977 982-9510968, +977 984-7945736';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists 9857837819 / 9829510968; moved them first. Original number kept after them. (Not applied: the phone had already been edited.)')
where id = '66f6a82d-0f71-4278-a41f-fb58162ec604' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 985-7837819, +977 982-9510968, +977 984-7945736';

-- City Holiday Boys Hostel (Bagbazar, Kathmandu)
update public.hms_leads set phone = '+977 984-9097871, +977 986-9613498, +977 980-5145196', whatsapp_viber = NULL
where id = '4d5f962d-cc77-48b7-ac42-652f0c8b9c8b' and phone is not distinct from '+977 986-9613498, +977 984-9097871, +977 980-5145196';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: 9849097871 is the number confirmed online (ktmhostel.com); moved it first so WhatsApp uses it.')
where id = '4d5f962d-cc77-48b7-ac42-652f0c8b9c8b' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 984-9097871, +977 986-9613498, +977 980-5145196';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: 9849097871 is the number confirmed online (ktmhostel.com); moved it first so WhatsApp uses it. (Not applied: the phone had already been edited.)')
where id = '4d5f962d-cc77-48b7-ac42-652f0c8b9c8b' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 984-9097871, +977 986-9613498, +977 980-5145196';

-- Homely Girls Hostel (Old Baneshwor, Kathmandu)
update public.hms_leads set phone = '+977 984-1905323, +977 1-4782729', whatsapp_viber = NULL
where id = '34f43741-ea55-4c6c-ad27-f057a4391b47' and phone is not distinct from '+977 984-1905323';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: only a landline (01-4782729) is listed online (educatenepal); added it. Mobile not confirmed.')
where id = '34f43741-ea55-4c6c-ad27-f057a4391b47' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 984-1905323, +977 1-4782729';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: only a landline (01-4782729) is listed online (educatenepal); added it. Mobile not confirmed. (Not applied: the phone had already been edited.)')
where id = '34f43741-ea55-4c6c-ad27-f057a4391b47' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 984-1905323, +977 1-4782729';

-- Passion Boys Hostel (Samakhusi, Kathmandu)
update public.hms_leads set phone = '+977 1-4364522, +977 984-1608262, +977 1-4020135', whatsapp_viber = NULL
where id = 'f436d122-3540-4df1-a607-ac37773428b2' and phone is not distinct from '+977 1-4364522, +977 984-1608262';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: the hostel''s Facebook page lists landlines 01-4364522 / 01-4020135; added the second. Mobile not confirmed.')
where id = 'f436d122-3540-4df1-a607-ac37773428b2' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 1-4364522, +977 984-1608262, +977 1-4020135';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: the hostel''s Facebook page lists landlines 01-4364522 / 01-4020135; added the second. Mobile not confirmed. (Not applied: the phone had already been edited.)')
where id = 'f436d122-3540-4df1-a607-ac37773428b2' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 1-4364522, +977 984-1608262, +977 1-4020135';

-- Metro Boys Hostel (Old Baneshwor, Kathmandu)
update public.hms_leads set name = 'New Bhagyodaya Boys Hostel', phone = '+977 980-4878571', whatsapp_viber = NULL
where id = '67e2f6c9-d089-4f64-a94b-25256f9c16e9' and phone is not distinct from '+977 980-4878571';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: 9804878571 is listed on hostelpilot.com as New Bhagyodaya Boys Hostel (Sinamangal Marg, New Baneshwor); renamed from "Metro Boys Hostel". Metro Boys Hostel itself is the Dillibazar lead (9855045665).')
where id = '67e2f6c9-d089-4f64-a94b-25256f9c16e9' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone = '+977 980-4878571';
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: 9804878571 is listed on hostelpilot.com as New Bhagyodaya Boys Hostel (Sinamangal Marg, New Baneshwor); renamed from "Metro Boys Hostel". Metro Boys Hostel itself is the Dillibazar lead (9855045665). (Not applied: the phone had already been edited.)')
where id = '67e2f6c9-d089-4f64-a94b-25256f9c16e9' and coalesce(notes, '') not like '%Number check 29 Sep 2026%' and phone is distinct from '+977 980-4878571';

-- Kathmandu Boys Hostel (Old Baneshwor, Kathmandu): note only
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: shikshasanjal.com lists a Kathmandu Boys Hostel (PanchaKumari, New Baneshwor) at 9849292611. Our number is shared with the Babarmahal lead; confirm which branch before messaging.')
where id = 'e4b2851c-240d-4d76-ab6f-34617d220716' and coalesce(notes, '') not like '%Number check 29 Sep 2026%';

-- Kathmandu Boys Hostel (Babarmahal, Kathmandu): note only
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: same number as the Old Baneshwor lead; shikshasanjal.com lists 9849292611 for the New Baneshwor branch. Confirm before messaging.')
where id = '6505ec78-4fca-47e2-a371-36a3c592018b' and coalesce(notes, '') not like '%Number check 29 Sep 2026%';

-- New Anugraha Girls Hostel (Putalisadak, Kathmandu): note only
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: an older directory (shikshasanjal.com) lists this number as Sunrise Boys Hostel, Putalisadak. Confirm the hostel name on first contact.')
where id = '652375b2-5134-465c-a86f-8da7fb651e09' and coalesce(notes, '') not like '%Number check 29 Sep 2026%';

-- Pariwar Girls Hostel (Aloknagar / Minbhawan, Kathmandu): note only
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: hostelpilot.com lists this number as Brighter Future Girls Hostel (Aloknagar). May have been renamed; confirm on first contact.')
where id = 'd691beb2-6879-4f33-a4b2-a1b12848c2fa' and coalesce(notes, '') not like '%Number check 29 Sep 2026%';

-- The Best boys hostel kathmandu (Jorpati corridor, Kathmandu): note only
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: The Best Boys Hostel (Anamnagar branch) is listed at 9808391541; this Jorpati lead may be a separate branch.')
where id = '04c845c5-7864-4e39-af50-1ccd5094eab6' and coalesce(notes, '') not like '%Number check 29 Sep 2026%';

-- BroZone Boys Hostel (Mitrapark / Chabahil, Kathmandu): note only
update public.hms_leads set notes = concat_ws(E'\n', nullif(notes, ''), 'Number check 29 Sep 2026: a BroZone Facebook post shows numbers close to ours (9866951416 / ...7842240). Worth a quick check.')
where id = '65a6e681-3917-4f92-a863-76ffe527c12a' and coalesce(notes, '') not like '%Number check 29 Sep 2026%';

commit;
