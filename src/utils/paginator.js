/**
 * @param {Array} items
 * @param {number} page
 * @param {number} perPage
 * @param {string} searchQuery
 * @returns {Object}
 */
const paginate = (items, page = 1, perPage = 10, searchQuery = '') => {
  const filteredItems = searchQuery
    ? items.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : items;
  const totalPages = Math.ceil(filteredItems.length / perPage);
  page = Math.max(1, Math.min(page, totalPages));
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    currentPage: page,
    perPage,
    totalPages,
    totalItems: filteredItems.length,
  };
};

module.exports = paginate;
