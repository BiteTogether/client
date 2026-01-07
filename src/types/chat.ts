export interface Message {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  id: string;
  roomId: string;
  content: string;
  type: "TEXT";
  sender: {
    id: number;
    username: string;
    fullName: string;
    avatar?: string;
  },
  replyTo?: string;
  deleted: boolean;
};

export type Messages = Message[];

export interface Room {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  id: string;
  name: string;
  avatar?: string;
  members: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatar?: string;
    role: string;
  }[];
  userIds: number[];
  roomType: "GROUP" | "DIRECT";
  adminIds: number[];
  lastMessageId: string;
  lastMessageAt: string;
};

export type Rooms = Room[];

export interface SendMessageRequest {
  roomId: string;
  content: string;
  type: "TEXT";
  replyToMessageId?: string;
};

export interface GetDirectChatRoomRequest {
  userId1: number;
  userId2: number;
};



// export interface Chat {
//   id: string;
//   type: 'direct' | 'group';
//   name?: string; // For group chats
//   participants: string[]; // User IDs
//   lastMessage?: Message;
//   unreadCount: number;
//   createdAt: string;
//   updatedAt: string;
// }



// export interface MessageItemProps {
//     fullName: string;
//     latestMessage: string;
//     receivedTime: string;
// }

// export interface MessageCurrentRecipientProps {
//   username: string;
//   fullName: string;
// }