export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// At least 4 non-space characters
export const PASSWORD_REGEX = /^[\S]{4,100}$/;
// Letters, numbers, dashes, and underscores
export const USERNAME_REGEX = /^[a-zA-Z0-9\-_]+$/;
// Letters, numbers, dashes, underscores, and spaces
export const ACCOUNTNAME_REGEX = /^[a-zA-Z0-9\-_\s]+$/;

export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 100;
export const EMAIL_MIN_LENGTH = 4;
export const EMAIL_MAX_LENGTH = 100;
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 100;
export const USERNAME_INVALID_CHARACTERS_REGEX = /[^a-zA-Z0-9\-_]/;
export const PASSWORD_INVALID_CHARACTERS_REGEX = /[\s]/;
export const EMAIL_INVALID_CHARACTERS_REGEX = /[\s]/;

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
