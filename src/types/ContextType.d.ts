interface Context {
	// ! search
	search: boolean;
	setSearch: React.Dispatch<React.SetStateAction<boolean>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	handleTerm: React.ChangeEventHandler<HTMLInputElement>;
	// ! toggle post request
	favorite: Record<string, boolean>;
	watchlist: Record<string, boolean>;
	setWatchlist: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
	setFavorite: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
	// ! token
	requestToken: string;
	setRequestToken: React.Dispatch<React.SetStateAction<string>>;
	profile: ResponseAccount;
	setProfile: React.Dispatch<React.SetStateAction<ResponseAccount>>;
	sessionId: string;
	setSessionId: React.Dispatch<React.SetStateAction<string>>;
}

type Status = { results: { id: number }[] };

type SetStatus = (
	value: (prevState: Record<string, boolean>) => Record<string, boolean>
) => void;
