import { JwtPayload } from "jsonwebtoken";

export interface JWTDataPayload extends JwtPayload {
  userData: {
    id: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
}

export interface SidebarProps {
  title: string;
  url: string;
}

export interface BiodataProps {
  id: string;
  kota_id: string;
  provinsi_id: string;
  age: string;
  kota: KotaProps;
  provinsi: ProvinsiProps;
  created_at: string;
  updated_at: string;
}

export interface UserProps {
  id: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
  biodata: BiodataProps;
  uservote: UserVote[];
}

export interface KotaProps {
  id: string;
  nama_kota: string;
  created_at: string;
  updated_at: string;
}

export interface ProvinsiProps {
  id: string;
  nama_provinsi: string;
  created_at: string;
  updated_at: string;
  kotas: KotaProps[];
}

export interface KandidatProps {
  id: string;
  nama_kandidat: string;
  no_urut: string;
  image: string;
  role: "DPR" | "PRESIDEN";
  partai_id: string;
  vote_id: string;
  created_at: string;
  updated_at: string;
  partai: PartaiProps;
  uservote: UserVote[];
}

export interface PartaiProps {
  id: string;
  nama_partai: string;
  logo: string;
  no_urut: string;
  vote_id: string;
  created_at: string;
  updated_at: string;
  kandidats: KandidatProps[];
}

export interface VoteProps {
  id: string;
  kota_id: string;
  provinsi_id: string;
  tipe_pemilihan: string;
  votetype_id: string;
  status: "ACTIVE" | "NOTACTIVE";
  start_date: string;
  end_date: string;
  min_age: string;
  created_at: string;
  updated_at: string;
  kota: KotaProps;
  provinsi: ProvinsiProps;
  votetype: VoteTypeProps;
  kandidats: KandidatProps[];
  userVote: UserVote[];
  partais: PartaiProps[];
}

export interface VoteTypeProps {
  id: string;
  type: "PILPRES" | "PILWANTAI" | "PILKADA";
  created_at: string;
  updated_at: string;
  vote: VoteProps;
}
export interface UserVote {
  user_id: string;
  kandidat_id: string;
  vote_id: string;
  user: UserProps;
  kandidat: KandidatProps;
  vote: VoteProps;
}
