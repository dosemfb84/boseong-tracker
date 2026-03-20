-- Boseong 2026 Marathon Tracker
-- Run this in your Supabase SQL editor

create table if not exists completions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null check (user_id in ('andrew', 'jimmy')),
  run_key text not null,
  completed_at timestamptz default now(),
  unique(user_id, run_key)
);

-- Enable Row Level Security
alter table completions enable row level security;

-- Allow anyone to read all completions (both users see each other's)
create policy "Public read"
  on completions for select
  using (true);

-- Allow anyone to insert
create policy "Public insert"
  on completions for insert
  with check (true);

-- Allow anyone to delete
create policy "Public delete"
  on completions for delete
  using (true);

-- Enable realtime for live updates
alter publication supabase_realtime add table completions;
