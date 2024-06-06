import { MediaSearch } from "../media/Common";

export interface Person {
	id: number;
	original_name: string;
	media_type: string;
	adult: false;
	name: string;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path: string;
	known_for: MediaSearch[];
}
