import { Observable as RxObservable } from 'rxjs';
import { ContractTypes } from './common-enums';

/**
 * @type The type ID represent kafka topic id.
 */
export type ID = string;
/**
 * @type The type DavID represent DAV unique identity string.
 */
export type DavID = string;
/**
 * @type The type BigInteger represent a big number.
 */
export type BigInteger = string;
/**
 * @type The type ContractArtifacts represent the DAV Contracts artifacts that contain ABI and networks addresses.
 */
export type ContractsArtifacts = { [T in ContractTypes]: any };
/**
 * @type The type Observable represent the SDK observable object that used to subscribe to Needs/Bids/Messages/etc...
 */
export class Observable<T> extends RxObservable<T>  {
    public topic: ID;
    public static fromObservable<T>(observableRx: RxObservable<T>, topic: ID): Observable<T> {
        const observable = observableRx as Observable<T>;
        observable.topic = topic;
        return observable;
    }
    private constructor() { super(); }
}
