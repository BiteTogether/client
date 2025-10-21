import { Option } from "../../../types/feed";

export const CreatePostOptions : Option[] = [
    { label: 'Your followers', value: 'public' },
    { label: 'Profiles you follow', value: 'followers' },
    { label: 'Mentioned only', value: 'mentions' },
]