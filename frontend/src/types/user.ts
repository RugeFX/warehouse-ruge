export type User = {
  id: number;
  username: string;
  staffId: number;
  staff: Staff;
};

export type LocalUserInfo = {
  accessToken: string;
  refreshToken: string;
};

export type PersistedInfo = {
  state?: LocalUserInfo;
  version: number;
};

export type Position = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  staff: Staff[];
  privilege: Privilege[];
};

export type MenuGroup = {
  id: number;
  name: string;
  icon: string;
  menuItem: MenuItem[];
  createdAt: string;
  updatedAt: string;
};

export type MenuItem = {
  id: number;
  name: string;
  icon: string;
  url: string;
  menuGroupId: number;
  createdAt: string;
  updatedAt: string;
  privilege: Privilege[];
  menuGroup: MenuGroup;
};

export type Privilege = {
  id: number;
  view: number;
  add: number;
  edit: number;
  delete: number;
  menuItemId: number;
  positionId: number;
  createdAt: string;
  updatedAt: string;
  menuItem: MenuItem;
  position: Position;
};

export type Staff = {
  id: number;
  positionId: number;
  name: string;
  registerDate: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  position: Position;
  user?: User;
};
