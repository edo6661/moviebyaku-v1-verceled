interface TranslationData {
	biography: string;
}

interface Translation {
	iso_3166_1: string;
	iso_639_1: string;
	name: string;
	english_name: string;
	data: TranslationData;
}

interface Translations {
	id: number;
	translations: Translation[];
}
