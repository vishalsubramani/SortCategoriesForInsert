module.exports = function sortCategoriesForInsert (inputJson) {
    //Loop through inputJson and construct nary-Tree with hierarchical categories
    var naryTree = function (inputJson, root) {
        var rootObj = [], obj = {};
        inputJson.forEach(function (a) {
            obj[a.id] = { payload: a, children: obj[a.id] && obj[a.id].children };
            if (a.parent_id === root) {
                rootObj.push(obj[a.id]);
            } else {
                obj[a.parent_id] = obj[a.parent_id] || {};
                obj[a.parent_id].children = obj[a.parent_id].children || [];
                obj[a.parent_id].children.push(obj[a.id]);
            }
        });
        return rootObj;
    }(inputJson, null);
    
    // Flatten the nary tree into flat sorted output
    var properJsonOutput = naryTree.reduce(function traverse(r, a) {
        return r.concat(a.payload, (a.children || []).reduce(traverse, []));
    }, []);

    return properJsonOutput;
  }