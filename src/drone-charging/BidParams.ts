import BaseBidParams from '../BidParams';
import IPrice from '../IPrice';
import Price from '../Price';
import { BigInteger, ID, DavID } from '../common-types';

/**
 * @interface IBidParams The interface drone-charging/IBidParams represent a valid argument of drone-charging/BidParams constructor.
 */
interface IBidParams {
    /**
     * @property The bid's topic id (used to send messages to service provider).
     */
    id: ID;
    /**
     * @property The bid's price (required).
     */
    price: IPrice | BigInteger;
    /**
     * @property The bid's vehicle DAV Id (required).
     */
    vehicleId: DavID;
    /**
     * @property The drone charging plug type.
     */
    plugType: string;
}
/**
 * @class The Class drone-charging/BidParams represent the parameters of drone-charging bid.
 */
export default class BidParams extends BaseBidParams {

    private static _protocol = 'DroneCharging';
    private static _type = 'Bid';

    /**
     * @property The drone charging plug type.
     */
    public plugType: string;
    public static getMessageType(): string {
        return `${this._protocol}:${this._type}`;
    }

    public static fromJson(json: any): BidParams {
        const price = new Price(json.price.value, json.price.type);
        const vehicleId = json.vehicleId;
        if (json.description) {
            price.description = json.price.description;
        }
        const bidParams = new BidParams({ price, vehicleId });
        if (json.ttl) {
            bidParams.ttl = json.ttl;
        }
        if (json.plugType) {
            bidParams.plugType = json.plugType;
        }
        return bidParams;
    }

    constructor(values: Partial<IBidParams>) {
        super(values);
        Object.assign(this, values);
    }

    public toJson() {
        const bidParams = Object.assign({ protocol: BidParams._protocol, type: BidParams._type }, this);
        return JSON.stringify(bidParams);
    }

    public toString(): string {
        return this.toJson();
    }

    public equals(other: BidParams): boolean {
        return this.ttl === other.ttl && this.price.equals(other.price) && this.plugType === other.plugType;
    }
}
