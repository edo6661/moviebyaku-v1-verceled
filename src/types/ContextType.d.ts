interface Context {
	search: boolean;
	setSearch: React.Dispatch<React.SetStateAction<boolean>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	handleTerm: React.ChangeEventHandler<HTMLInputElement>;
}
