import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ApproveTeamMemberPayload = {
  __typename?: 'ApproveTeamMemberPayload';
  member?: Maybe<TeamMember>;
  team?: Maybe<Team>;
};

export type AttendPayload = {
  __typename?: 'AttendPayload';
  event: Event;
};

/** Live session or meetup attendee */
export type Attendee = {
  __typename?: 'Attendee';
  completed: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};


/** Live session or meetup attendee */
export type AttendeeCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Live session or meetup attendee */
export type AttendeeUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type AttendeeConnection = {
  __typename?: 'AttendeeConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AttendeeEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type AttendeeEdge = {
  __typename?: 'AttendeeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Attendee>;
};

export enum AttendingStatus {
  Maybe = 'Maybe',
  No = 'No',
  Yes = 'Yes'
}

/** Training video */
export type Class = Node & {
  __typename?: 'Class';
  cover: Picture;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  equipment: Array<Equipment>;
  /** The ID of an object */
  id: Scalars['ID'];
  instructors: Array<Instructor>;
  likes: Scalars['Int'];
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['String']>;
  reviewRating?: Maybe<Scalars['Float']>;
  streamingUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ClassType>;
  updatedAt?: Maybe<Scalars['String']>;
  views: Scalars['Int'];
  vimeoId?: Maybe<Scalars['String']>;
};


/** Training video */
export type ClassCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Training video */
export type ClassPublishedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Training video */
export type ClassUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type ClassConnection = {
  __typename?: 'ClassConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ClassEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ClassEdge = {
  __typename?: 'ClassEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Class>;
};

/** Class type */
export type ClassType = {
  __typename?: 'ClassType';
  active: Scalars['Boolean'];
  /** The ID of an object */
  id: Scalars['ID'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

/** User comment */
export type Comment = Readable & {
  __typename?: 'Comment';
  author: User;
  commentsCount: Scalars['Int'];
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  likesCount: Scalars['Int'];
  read?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};


/** User comment */
export type CommentCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** User comment */
export type CommentUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

export type CreateClassInput = {
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  instructors?: InputMaybe<Array<Scalars['String']>>;
  poster?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  typeId?: InputMaybe<Scalars['ID']>;
  vimeoId?: InputMaybe<Scalars['String']>;
};

export type CreateClassPayload = {
  __typename?: 'CreateClassPayload';
  class?: Maybe<Class>;
};

export type CreateTeamInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type CreateTeamPayload = {
  __typename?: 'CreateTeamPayload';
  team?: Maybe<Team>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  idToken?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  signIn?: InputMaybe<Scalars['Boolean']>;
  timeZone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user?: Maybe<User>;
};

export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  deletedId?: Maybe<Scalars['ID']>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  deletedId?: Maybe<Scalars['ID']>;
};

/** Fitness equipment */
export type Equipment = {
  __typename?: 'Equipment';
  active: Scalars['Boolean'];
  /** The ID of an object */
  id: Scalars['ID'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

/** Scheduled video stream */
export type Event = Node & Readable & {
  __typename?: 'Event';
  /** RSVP status */
  attending?: Maybe<AttendingStatus>;
  class?: Maybe<Class>;
  createdAt?: Maybe<Scalars['String']>;
  creator: User;
  /** The ID of an object */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  scheduledFor?: Maybe<Scalars['String']>;
  team: Team;
  type: EventType;
  updatedAt?: Maybe<Scalars['String']>;
  zoom?: Maybe<Scalars['String']>;
};


/** Scheduled video stream */
export type EventCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Scheduled video stream */
export type EventScheduledForArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Scheduled video stream */
export type EventUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type EventConnection = {
  __typename?: 'EventConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Event>;
};

/** Session, Meetup, or Zoom */
export enum EventType {
  Meetup = 'Meetup',
  Session = 'Session',
  Zoom = 'Zoom'
}

export enum EventsFilter {
  Joined = 'Joined',
  Upcoming = 'Upcoming'
}

/** The OAuth user identity (credentials). */
export type Identity = {
  __typename?: 'Identity';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  provider: IdentityProvider;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


/** The OAuth user identity (credentials). */
export type IdentityCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** The OAuth user identity (credentials). */
export type IdentityUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** OAuth identity provider */
export enum IdentityProvider {
  Apple = 'Apple',
  Facebook = 'Facebook',
  Google = 'Google'
}

/** Fitness instructor */
export type Instructor = Node & {
  __typename?: 'Instructor';
  createdAt?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};


/** Fitness instructor */
export type InstructorCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Fitness instructor */
export type InstructorUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type JoinTeamPayload = {
  __typename?: 'JoinTeamPayload';
  member?: Maybe<TeamMember>;
  team?: Maybe<Team>;
};

export enum MembershipStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Pending = 'Pending'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Approve or decline a team member */
  approveOrDenyMembership?: Maybe<ApproveTeamMemberPayload>;
  /** RSVP */
  attend?: Maybe<AttendPayload>;
  /** Creates a new class */
  createClass?: Maybe<CreateClassPayload>;
  /** Creates a new team */
  createTeam?: Maybe<CreateTeamPayload>;
  /** Creates a new user account */
  createUser?: Maybe<CreateUserPayload>;
  /** Deletes a user comment */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes user account */
  deleteUser?: Maybe<DeleteUserPayload>;
  getFirebaseToken?: Maybe<Scalars['String']>;
  getTwilioToken?: Maybe<Scalars['String']>;
  getUploadURL?: Maybe<Scalars['String']>;
  /** Join a team */
  join?: Maybe<JoinTeamPayload>;
  /** Toggles a reaction ("like", "high five", etc.) to posts and comments. */
  react?: Maybe<ReactPayload>;
  /** Marks specified notifications, posts, comments, etc. as read. */
  read?: Maybe<ReadPayload>;
  /** Sends password recovery code to the user's email address */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** Saves the uploaded file (URL path) to the database */
  saveUpload?: Maybe<SaveUploadPayload>;
  /** Schedules an upcoming class (session or meetup) */
  scheduleEvent?: Maybe<ScheduleEventPayload>;
  /** Creates an authentication session */
  signIn?: Maybe<SignInPayload>;
  /** Clears authentication session */
  signOut?: Maybe<Scalars['String']>;
  /** Updates the user account. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Creates or updates a user comment */
  upsertComment?: Maybe<UpsertCommentPayload>;
  /** Creates or updates a user post */
  upsertPost?: Maybe<UpsertPostPayload>;
};


export type MutationApproveOrDenyMembershipArgs = {
  memberId: Scalars['String'];
  status: Scalars['String'];
};


export type MutationAttendArgs = {
  eventId: Scalars['ID'];
  status: AttendingStatus;
};


export type MutationCreateClassArgs = {
  dryRun?: Scalars['Boolean'];
  input?: InputMaybe<CreateClassInput>;
};


export type MutationCreateTeamArgs = {
  dryRun?: Scalars['Boolean'];
  input?: InputMaybe<CreateTeamInput>;
};


export type MutationCreateUserArgs = {
  dryRun?: Scalars['Boolean'];
  input?: InputMaybe<CreateUserInput>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  password?: InputMaybe<Scalars['String']>;
};


export type MutationGetUploadUrlArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  fileName: Scalars['String'];
};


export type MutationJoinArgs = {
  team: Scalars['String'];
};


export type MutationReactArgs = {
  postId?: InputMaybe<Scalars['ID']>;
  reaction: Reaction;
};


export type MutationReadArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationResetPasswordArgs = {
  code?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationSaveUploadArgs = {
  id: Scalars['ID'];
  uploadType: UploadType;
  uploadURL: Scalars['String'];
};


export type MutationScheduleEventArgs = {
  input?: InputMaybe<ScheduleEventInput>;
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInInput>;
};


export type MutationUpdateUserArgs = {
  dryRun?: Scalars['Boolean'];
  input?: InputMaybe<UpdateUserInput>;
};


export type MutationUpsertCommentArgs = {
  input?: InputMaybe<UpsertCommentInput>;
};


export type MutationUpsertPostArgs = {
  input?: InputMaybe<UpsertPostInput>;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** Website notification */
export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  link: Scalars['String'];
  message: Scalars['String'];
  /** Team or user picture */
  picture: Picture;
  subject?: Maybe<Readable>;
};


/** Website notification */
export type NotificationCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Website notification */
export type NotificationMessageArgs = {
  truncate?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<NotificationEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
  unreadCount: Scalars['Int'];
};

/** An edge in a connection. */
export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Notification>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Picture = {
  __typename?: 'Picture';
  url?: Maybe<Scalars['String']>;
};

/** Team member post or story */
export type Post = Readable & {
  __typename?: 'Post';
  author: User;
  comments: Array<Comment>;
  commentsCount: Scalars['Int'];
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  media: Picture;
  reacted?: Maybe<Array<Reaction>>;
  reactions: Reactions;
  read?: Maybe<Scalars['Boolean']>;
  team: Team;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  viewsCount: Scalars['Int'];
};


/** Team member post or story */
export type PostCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
};


/** Team member post or story */
export type PostCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Team member post or story */
export type PostUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

export type ReactPayload = {
  __typename?: 'ReactPayload';
  post?: Maybe<Post>;
};

/** User reaction to posts and comments. */
export enum Reaction {
  FistBump = 'FistBump',
  HighFive = 'HighFive',
  Like = 'Like'
}

export type Reactions = {
  __typename?: 'Reactions';
  fistBumps: Scalars['Int'];
  highFives: Scalars['Int'];
  likes: Scalars['Int'];
};

export type ReadPayload = {
  __typename?: 'ReadPayload';
  records?: Maybe<Array<Maybe<Readable>>>;
};

export type Readable = {
  id: Scalars['ID'];
  read?: Maybe<Scalars['Boolean']>;
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  user?: Maybe<User>;
};

/** The top-level API */
export type Root = {
  __typename?: 'Root';
  attendees?: Maybe<AttendeeConnection>;
  /** Class types */
  classTypes: Array<Maybe<ClassType>>;
  classes?: Maybe<ClassConnection>;
  comments?: Maybe<CommentConnection>;
  /** Fitness equipment */
  equipment: Array<Maybe<Equipment>>;
  events?: Maybe<EventConnection>;
  /** The list of instructors */
  instructors: Array<Instructor>;
  /** The authenticated user. */
  me?: Maybe<User>;
  members?: Maybe<TeamMemberConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Fetches objects given their IDs */
  nodes: Array<Maybe<Node>>;
  notifications?: Maybe<NotificationConnection>;
  posts?: Maybe<PostConnection>;
  /** Find team by URL slug */
  team?: Maybe<Team>;
  teams?: Maybe<TeamConnection>;
  /** Find user by username or email. */
  user?: Maybe<User>;
  users?: Maybe<UserConnection>;
  video?: Maybe<Video>;
  workoutHistory?: Maybe<WorkoutHistoryConnection>;
};


/** The top-level API */
export type RootAttendeesArgs = {
  after?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
};


/** The top-level API */
export type RootClassesArgs = {
  after?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instructor?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['ID']>;
};


/** The top-level API */
export type RootEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Array<EventsFilter>>;
  first?: InputMaybe<Scalars['Int']>;
  team?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<MembershipStatus>;
  team?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootNodeArgs = {
  id: Scalars['ID'];
};


/** The top-level API */
export type RootNodesArgs = {
  ids: Array<Scalars['ID']>;
};


/** The top-level API */
export type RootNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


/** The top-level API */
export type RootPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  team?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootTeamArgs = {
  slug?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


/** The top-level API */
export type RootUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


/** The top-level API */
export type RootVideoArgs = {
  classId: Scalars['ID'];
};


/** The top-level API */
export type RootWorkoutHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type SaveUploadPayload = {
  __typename?: 'SaveUploadPayload';
  class?: Maybe<Class>;
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type ScheduleEventInput = {
  classId?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  team: Scalars['String'];
  type: EventType;
  zoom?: InputMaybe<Scalars['String']>;
};

export type ScheduleEventPayload = {
  __typename?: 'ScheduleEventPayload';
  event?: Maybe<Event>;
};

export type SignInInput = {
  /** User's password */
  password?: InputMaybe<Scalars['String']>;
  /** Username or email */
  username?: InputMaybe<Scalars['String']>;
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Fitness community */
export type Team = Node & {
  __typename?: 'Team';
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  membership?: Maybe<TeamMember>;
  name: Scalars['String'];
  picture: Picture;
  slug: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};


/** Fitness community */
export type TeamCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Fitness community */
export type TeamUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type TeamConnection = {
  __typename?: 'TeamConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TeamEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type TeamEdge = {
  __typename?: 'TeamEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Team>;
};

/** User who is linked to team */
export type TeamMember = Node & {
  __typename?: 'TeamMember';
  admin: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  status?: Maybe<MembershipStatus>;
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};


/** User who is linked to team */
export type TeamMemberCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** User who is linked to team */
export type TeamMemberUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type TeamMemberConnection = {
  __typename?: 'TeamMemberConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TeamMemberEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type TeamMemberEdge = {
  __typename?: 'TeamMemberEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<TeamMember>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<User>;
};

/** The type of the uploaded file */
export enum UploadType {
  ClassCoverImage = 'ClassCoverImage',
  ClassVideoImage = 'ClassVideoImage',
  PostMediaFile = 'PostMediaFile',
  ProfilePicture = 'ProfilePicture',
  TeamCoverImage = 'TeamCoverImage'
}

export type UpsertCommentInput = {
  content: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  parentId?: InputMaybe<Scalars['ID']>;
  postId?: InputMaybe<Scalars['ID']>;
};

export type UpsertCommentPayload = {
  __typename?: 'UpsertCommentPayload';
  comment?: Maybe<Comment>;
  commentEdge?: Maybe<CommentEdge>;
  post?: Maybe<Post>;
};

export type UpsertPostInput = {
  content: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  /** Image or video URL */
  media?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpsertPostPayload = {
  __typename?: 'UpsertPostPayload';
  post?: Maybe<Post>;
  postEdge?: Maybe<PostEdge>;
};

/** The registered user account. */
export type User = Node & {
  __typename?: 'User';
  admin?: Maybe<Scalars['Boolean']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  identities?: Maybe<Array<Identity>>;
  lastLogin?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  picture: Picture;
  rank?: Maybe<Scalars['String']>;
  rankProgress?: Maybe<Scalars['Float']>;
  timeZone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


/** The registered user account. */
export type UserCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** The registered user account. */
export type UserLastLoginArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** The registered user account. */
export type UserUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<User>;
};

/** Vimeo video details */
export type Video = {
  __typename?: 'Video';
  created?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  height: Scalars['Int'];
  link: Scalars['String'];
  modified?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  playsCount: Scalars['Int'];
  src: Scalars['String'];
  type: Scalars['String'];
  width: Scalars['Int'];
};


/** Vimeo video details */
export type VideoCreatedArgs = {
  format?: InputMaybe<Scalars['String']>;
};


/** Vimeo video details */
export type VideoModifiedArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** Log of workouts and their statuses */
export type WorkoutHistory = Node & {
  __typename?: 'WorkoutHistory';
  class?: Maybe<Class>;
  completionPercent?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  elapsedDuration: Scalars['Int'];
  event?: Maybe<Event>;
  /** The ID of an object */
  id: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  user: User;
};


/** Log of workouts and their statuses */
export type WorkoutHistoryDateArgs = {
  format?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type WorkoutHistoryConnection = {
  __typename?: 'WorkoutHistoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<WorkoutHistoryEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type WorkoutHistoryEdge = {
  __typename?: 'WorkoutHistoryEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<WorkoutHistory>;
};

export type ClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassesQuery = { __typename?: 'Root', classes?: { __typename?: 'ClassConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'ClassEdge', node?: { __typename?: 'Class', id: string, title?: string | null | undefined, cover: { __typename?: 'Picture', url?: string | null | undefined } } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type FeedQueryVariables = Exact<{
  team?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
}>;


export type FeedQuery = { __typename?: 'Root', posts?: { __typename?: 'PostConnection', edges?: Array<{ __typename?: 'PostEdge', post?: { __typename?: 'Post', id: string, title: string, content: string, reacted?: Array<Reaction> | null | undefined, commentsCount: number, createdAt?: string | null | undefined, media: { __typename?: 'Picture', url?: string | null | undefined }, reactions: { __typename?: 'Reactions', likes: number, highFives: number, fistBumps: number }, comments: Array<{ __typename?: 'Comment', content: string, createdAt?: string | null | undefined, author: { __typename?: 'User', username?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, rank?: string | null | undefined, rankProgress?: number | null | undefined, picture: { __typename?: 'Picture', url?: string | null | undefined } } }>, author: { __typename?: 'User', id: string, username?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, rank?: string | null | undefined, rankProgress?: number | null | undefined, picture: { __typename?: 'Picture', url?: string | null | undefined } }, team: { __typename?: 'Team', id: string, slug: string, name: string } } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type PostCardCommentMutationMutationVariables = Exact<{
  input: UpsertCommentInput;
}>;


export type PostCardCommentMutationMutation = { __typename?: 'Mutation', upsertComment?: { __typename?: 'UpsertCommentPayload', post?: { __typename?: 'Post', id: string, commentsCount: number } | null | undefined, comment?: { __typename?: 'Comment', id: string, content: string, createdAt?: string | null | undefined, author: { __typename?: 'User', username?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, rank?: string | null | undefined, rankProgress?: number | null | undefined, picture: { __typename?: 'Picture', url?: string | null | undefined } } } | null | undefined } | null | undefined };


export const ClassesDocument = `
    query Classes {
  classes {
    pageInfo {
      startCursor
      endCursor
    }
    totalCount
    edges {
      node {
        id
        title
        cover {
          url
        }
      }
    }
  }
}
    `;
export const useClassesQuery = <
      TData = ClassesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ClassesQueryVariables,
      options?: UseQueryOptions<ClassesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ClassesQuery, TError, TData>(
      variables === undefined ? ['Classes'] : ['Classes', variables],
      fetcher<ClassesQuery, ClassesQueryVariables>(client, ClassesDocument, variables, headers),
      options
    );
export const FeedDocument = `
    query Feed($team: String, $user: String) {
  posts(team: $team, user: $user, first: 20) {
    edges {
      post: node {
        id
        title
        content
        media {
          url
        }
        reactions {
          likes
          highFives
          fistBumps
        }
        reacted
        commentsCount
        comments(first: 1000) {
          content
          createdAt
          author {
            username
            firstName
            lastName
            picture {
              url
            }
            rank
            rankProgress
          }
        }
        createdAt
        author {
          id
          username
          firstName
          lastName
          picture {
            url
          }
          rank
          rankProgress
        }
        team {
          id
          slug
          name
        }
      }
    }
  }
}
    `;
export const useFeedQuery = <
      TData = FeedQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FeedQueryVariables,
      options?: UseQueryOptions<FeedQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FeedQuery, TError, TData>(
      variables === undefined ? ['Feed'] : ['Feed', variables],
      fetcher<FeedQuery, FeedQueryVariables>(client, FeedDocument, variables, headers),
      options
    );
export const PostCardCommentMutationDocument = `
    mutation PostCardCommentMutation($input: UpsertCommentInput!) {
  upsertComment(input: $input) {
    post {
      id
      commentsCount
    }
    comment {
      id
      content
      createdAt
      author {
        username
        firstName
        lastName
        picture {
          url
        }
        rank
        rankProgress
      }
    }
  }
}
    `;
export const usePostCardCommentMutationMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PostCardCommentMutationMutation, TError, PostCardCommentMutationMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PostCardCommentMutationMutation, TError, PostCardCommentMutationMutationVariables, TContext>(
      'PostCardCommentMutation',
      (variables?: PostCardCommentMutationMutationVariables) => fetcher<PostCardCommentMutationMutation, PostCardCommentMutationMutationVariables>(client, PostCardCommentMutationDocument, variables, headers)(),
      options
    );