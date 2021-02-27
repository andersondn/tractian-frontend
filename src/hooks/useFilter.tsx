import { useCallback } from "react"
import { useState } from "react"
import { IAsset } from '../types';


const useAssetFilter = (entrada: any): [a: IAsset[], b: Function] => {
    const [filters, setFilters] = useState<any>({})
    const setFilter = useCallback((i) => {
        setFilters((f: any) => ({ ...f, ...i }));
    }, []);

    function assetFilter(asset: IAsset): Boolean {
        const { search, unit, user } = filters
        let result = true;
        if (search) {
            result = asset.assetName.toLowerCase().search(search.toLowerCase()) >= 0 ||
                     asset.description.toLowerCase().search(search.toLowerCase()) >= 0 ||
                    asset.model.toLowerCase().search(search.toLowerCase()) >= 0
        }
        if (unit) {
            result = unit === asset.unitId && result
        }

        if (user) {
            result = user === asset.userId && result
        }
        return result;

    }
    const filteredData = entrada?.filter(assetFilter)
    return [filteredData, setFilter]
}

export default useAssetFilter