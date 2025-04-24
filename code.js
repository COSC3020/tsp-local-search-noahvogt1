function tsp_ls(distance_matrix) {
    let n = distance_matrix.length;

    if (n <= 1) {
        return 0;
    }

    let route = [];
    for (let i = 0; i < n; i++) {
        route[i] = i;
    }
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let swap = route[i];
        route[i] = route[j];
        route[j] = swap;
    }

    let totalDistance = 0;
    for (let i = 0; i < n - 1; i++) {
        totalDistance += distance_matrix[route[i]][route[i + 1]];
    }

    let improvement = 0;
    while (improvement < 10) {
        let i = 1 + Math.floor(Math.random() * (n - 3));
        let k = i + Math.floor(Math.random() * (n - i));

        let oldDist = distance_matrix[route[i - 1]][route[i]] + distance_matrix[route[k]][route[k + 1]];
        let newDist = distance_matrix[route[i - 1]][route[k]] + distance_matrix[route[i]][route[k + 1]];
        let change   = newDist - oldDist;

        if (change < 0) {
            let start = route.slice(0, i);
            let reversed = route.slice(i, k + 1).reverse();
            let end = route.slice(k + 1);
            route =  start.concat(reversed, end);

            totalDistance += change;
            improvement = 0;
        } else {
            improvement++;
        }
    }

    return totalDistance;
}
