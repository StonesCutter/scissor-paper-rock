// import React from 'react'

// function handleSearchBar(state) {
//     // faccio una copia dell'oggetto state
//     let copyState = Object.assign({}, state);
//     console.log("Copy State", copyState.wineList);

//     let result = copyState.wineList.wines.filter((wine) => {
//         console.log("wine", wine);
//         if (copyState.wineList.wines || copyState.wineList.wines.name.toLowerCase().includes(copyState.searchWine.toLowerCase()) || String(wine.price).includes(copyState.searchWine)) return wine;
//     })

//     console.log("result", result);
//     return result;

//     // let result = itemsObj.wines
//     //     .filter((wine) => {
//     //         if (copyState.searchWine === '') {
//     //             return wine;
//     //         } else if (wine.name.toLowerCase().includes(copyState.searchWine.toLowerCase())) {
//     //             return wine;
//     //         } else if (String(wine.price).includes(copyState.searchWine)) {
//     //             return wine;
//     //         }
//     //     })
// }

// export default handleSearchBar