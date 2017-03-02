const { buildPath, performRequest } = require('./methods/base');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('./methods/items');
const { createFile, getFiles, getFile, updateFile } = require('./methods/files');
const { getTables, getTable, createTable } = require('./methods/tables');
const { createColumn, getColumns, getColumn, updateColumn, deleteColumn } = require('./methods/columns');
const { createPrivilege, getGroupPrivilege, getTablePrivilege, updatePrivilege } = require('./methods/privileges');
const { getPreference, updatePreference } = require('./methods/preferences');
const { getMessages, getMessage } = require('./methods/messages');
const { getActivity } = require('./methods/activity');
const { getBookmarks, getUserBookmarks, getBookmark, createBookmark, deleteBookmark } = require('./methods/bookmarks');
const { getSettings, getSettingsByCollection, updateSettings } = require('./methods/settings');

module.exports = {
  buildPath,
  performRequest,

  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,

  createFile,
  getFiles,
  getFile,
  updateFile,

  getTables,
  getTable,
  createTable,

  createColumn,
  getColumns,
  getColumn,
  updateColumn,
  deleteColumn,

  createPrivilege,
  getGroupPrivilege,
  getTablePrivilege,
  updatePrivilege,

  getPreference,
  updatePreference,

  getMessages,
  getMessage,

  getActivity,              // ^1.1

  getBookmarks,
  getUserBookmarks,         // ^1.1
  getBookmark,
  createBookmark,           // ^1.1
  deleteBookmark,           // ^1.1

  getSettings,
  getSettingsByCollection,
  updateSettings
};
