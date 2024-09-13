// export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // At least 4 non-space characters
// export const PASSWORD_REGEX = /^[\S]{4,100}$/;
// // Letters, numbers, dashes, and underscores
// export const USERNAME_REGEX = /^[a-zA-Z0-9\-_]+$/;
// // Letters, numbers, dashes, underscores, and spaces
// export const ACCOUNTNAME_REGEX = /^[a-zA-Z0-9\-_\s]+$/;

export const Username = {
	MinLength: 4,
	MinLengthFeedback: "Username must be at least 4 characters",
	MaxLength: 100,
	MaxLengthFeedback: "Username cannot be longer than 100 characters",
	InvalidCharacterRegex: /[^a-zA-Z0-9\-_]/,
	InvalidCharacterFeedback:
		"Username can only contain letters, numbers, dashes, and underscores",
	Tooltip:
		"A username to identify your account. Can contain letters, numbers, dashes, and underscores.",
};

export const DisplayName = {
	MinLength: 1,
	MinLengthFeedback: "Display name must be at least 1 character",
	MaxLength: 100,
	MaxLengthFeedback: "Display name cannot be longer than 100 characters",
	InvalidCharacterRegex: /[\\]/,
	InvalidCharacterFeedback: "Display name cannot contain backslashes",
	Tooltip: "A display name for other users to see.",
};

export const Email = {
	MinLength: 4,
	MinLengthFeedback: "Email must be at least 4 characters",
	MaxLength: 100,
	MaxLengthFeedback: "Email cannot be longer than 100 characters",
	InvalidCharacterRegex: /[\s]/,
	InvalidCharacterFeedback: "Email cannot contain whitespace",
	Tooltip:
		"An email address to identify your account. Must be a valid email address.",
};

export const Password = {
	MinLength: 4,
	MinLengthFeedback: "Password must be at least 4 characters",
	MaxLength: 100,
	MaxLengthFeedback: "Password cannot be longer than 100 characters",
	InvalidCharacterRegex: /[\s]/,
	InvalidCharacterFeedback: "Password cannot contain whitespace",
	Tooltip: "A password to secure your account. Cannot contain whitespace.",
};
