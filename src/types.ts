export interface IUser {
    _id: string
    name: string,
    username: string,
    email: string,
}

export interface IAsset {
    _id: string
    assetName: string,
    imageUrl: string,
    description: string,
    model: string,
    status: AssetStatus,
    healthScore: number,
    unitId: string,
    userId: string,
    maintainer: string,
    unit: { unitName: string }
    user: { name: string }


}

export interface IUnit {
    _id: string
    unitName: string,
    companyId: string,
}

export enum AssetStatus {
    inAlert = "ALERT",
    inOperation = "OPERATION",
    inDowntime = "DOWNTIME"

}

export interface ICompany {
    _id: string
    companyName: string
}