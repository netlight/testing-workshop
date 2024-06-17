export interface Operation {
  id: number;
  description: string;
  longDescription: string;
  address: string;
  isAcknowledged: boolean;
  assignee?: string;
  assigneeAvatar?: string;
}
