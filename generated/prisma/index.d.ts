
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Parlamentar
 * 
 */
export type Parlamentar = $Result.DefaultSelection<Prisma.$ParlamentarPayload>
/**
 * Model VoteEvent
 * 
 */
export type VoteEvent = $Result.DefaultSelection<Prisma.$VoteEventPayload>
/**
 * Model VoteRecord
 * 
 */
export type VoteRecord = $Result.DefaultSelection<Prisma.$VoteRecordPayload>
/**
 * Model Proposicao
 * 
 */
export type Proposicao = $Result.DefaultSelection<Prisma.$ProposicaoPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Parlamentars
 * const parlamentars = await prisma.parlamentar.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Parlamentars
   * const parlamentars = await prisma.parlamentar.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.parlamentar`: Exposes CRUD operations for the **Parlamentar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parlamentars
    * const parlamentars = await prisma.parlamentar.findMany()
    * ```
    */
  get parlamentar(): Prisma.ParlamentarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voteEvent`: Exposes CRUD operations for the **VoteEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VoteEvents
    * const voteEvents = await prisma.voteEvent.findMany()
    * ```
    */
  get voteEvent(): Prisma.VoteEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voteRecord`: Exposes CRUD operations for the **VoteRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VoteRecords
    * const voteRecords = await prisma.voteRecord.findMany()
    * ```
    */
  get voteRecord(): Prisma.VoteRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proposicao`: Exposes CRUD operations for the **Proposicao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proposicaos
    * const proposicaos = await prisma.proposicao.findMany()
    * ```
    */
  get proposicao(): Prisma.ProposicaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Parlamentar: 'Parlamentar',
    VoteEvent: 'VoteEvent',
    VoteRecord: 'VoteRecord',
    Proposicao: 'Proposicao',
    SyncLog: 'SyncLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "parlamentar" | "voteEvent" | "voteRecord" | "proposicao" | "syncLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Parlamentar: {
        payload: Prisma.$ParlamentarPayload<ExtArgs>
        fields: Prisma.ParlamentarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParlamentarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParlamentarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>
          }
          findFirst: {
            args: Prisma.ParlamentarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParlamentarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>
          }
          findMany: {
            args: Prisma.ParlamentarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>[]
          }
          create: {
            args: Prisma.ParlamentarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>
          }
          createMany: {
            args: Prisma.ParlamentarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParlamentarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>[]
          }
          delete: {
            args: Prisma.ParlamentarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>
          }
          update: {
            args: Prisma.ParlamentarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>
          }
          deleteMany: {
            args: Prisma.ParlamentarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParlamentarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParlamentarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>[]
          }
          upsert: {
            args: Prisma.ParlamentarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParlamentarPayload>
          }
          aggregate: {
            args: Prisma.ParlamentarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParlamentar>
          }
          groupBy: {
            args: Prisma.ParlamentarGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParlamentarGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParlamentarCountArgs<ExtArgs>
            result: $Utils.Optional<ParlamentarCountAggregateOutputType> | number
          }
        }
      }
      VoteEvent: {
        payload: Prisma.$VoteEventPayload<ExtArgs>
        fields: Prisma.VoteEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>
          }
          findFirst: {
            args: Prisma.VoteEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>
          }
          findMany: {
            args: Prisma.VoteEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>[]
          }
          create: {
            args: Prisma.VoteEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>
          }
          createMany: {
            args: Prisma.VoteEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>[]
          }
          delete: {
            args: Prisma.VoteEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>
          }
          update: {
            args: Prisma.VoteEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>
          }
          deleteMany: {
            args: Prisma.VoteEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoteEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>[]
          }
          upsert: {
            args: Prisma.VoteEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteEventPayload>
          }
          aggregate: {
            args: Prisma.VoteEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoteEvent>
          }
          groupBy: {
            args: Prisma.VoteEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteEventCountArgs<ExtArgs>
            result: $Utils.Optional<VoteEventCountAggregateOutputType> | number
          }
        }
      }
      VoteRecord: {
        payload: Prisma.$VoteRecordPayload<ExtArgs>
        fields: Prisma.VoteRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>
          }
          findFirst: {
            args: Prisma.VoteRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>
          }
          findMany: {
            args: Prisma.VoteRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>[]
          }
          create: {
            args: Prisma.VoteRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>
          }
          createMany: {
            args: Prisma.VoteRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>[]
          }
          delete: {
            args: Prisma.VoteRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>
          }
          update: {
            args: Prisma.VoteRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>
          }
          deleteMany: {
            args: Prisma.VoteRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoteRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>[]
          }
          upsert: {
            args: Prisma.VoteRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoteRecordPayload>
          }
          aggregate: {
            args: Prisma.VoteRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoteRecord>
          }
          groupBy: {
            args: Prisma.VoteRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteRecordCountArgs<ExtArgs>
            result: $Utils.Optional<VoteRecordCountAggregateOutputType> | number
          }
        }
      }
      Proposicao: {
        payload: Prisma.$ProposicaoPayload<ExtArgs>
        fields: Prisma.ProposicaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProposicaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProposicaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>
          }
          findFirst: {
            args: Prisma.ProposicaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProposicaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>
          }
          findMany: {
            args: Prisma.ProposicaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>[]
          }
          create: {
            args: Prisma.ProposicaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>
          }
          createMany: {
            args: Prisma.ProposicaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProposicaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>[]
          }
          delete: {
            args: Prisma.ProposicaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>
          }
          update: {
            args: Prisma.ProposicaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>
          }
          deleteMany: {
            args: Prisma.ProposicaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProposicaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProposicaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>[]
          }
          upsert: {
            args: Prisma.ProposicaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposicaoPayload>
          }
          aggregate: {
            args: Prisma.ProposicaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProposicao>
          }
          groupBy: {
            args: Prisma.ProposicaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProposicaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProposicaoCountArgs<ExtArgs>
            result: $Utils.Optional<ProposicaoCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    parlamentar?: ParlamentarOmit
    voteEvent?: VoteEventOmit
    voteRecord?: VoteRecordOmit
    proposicao?: ProposicaoOmit
    syncLog?: SyncLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ParlamentarCountOutputType
   */

  export type ParlamentarCountOutputType = {
    votos: number
    proposicoes: number
  }

  export type ParlamentarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votos?: boolean | ParlamentarCountOutputTypeCountVotosArgs
    proposicoes?: boolean | ParlamentarCountOutputTypeCountProposicoesArgs
  }

  // Custom InputTypes
  /**
   * ParlamentarCountOutputType without action
   */
  export type ParlamentarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParlamentarCountOutputType
     */
    select?: ParlamentarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParlamentarCountOutputType without action
   */
  export type ParlamentarCountOutputTypeCountVotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteRecordWhereInput
  }

  /**
   * ParlamentarCountOutputType without action
   */
  export type ParlamentarCountOutputTypeCountProposicoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposicaoWhereInput
  }


  /**
   * Count Type VoteEventCountOutputType
   */

  export type VoteEventCountOutputType = {
    votos: number
  }

  export type VoteEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votos?: boolean | VoteEventCountOutputTypeCountVotosArgs
  }

  // Custom InputTypes
  /**
   * VoteEventCountOutputType without action
   */
  export type VoteEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEventCountOutputType
     */
    select?: VoteEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VoteEventCountOutputType without action
   */
  export type VoteEventCountOutputTypeCountVotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteRecordWhereInput
  }


  /**
   * Count Type ProposicaoCountOutputType
   */

  export type ProposicaoCountOutputType = {
    votacoes: number
  }

  export type ProposicaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votacoes?: boolean | ProposicaoCountOutputTypeCountVotacoesArgs
  }

  // Custom InputTypes
  /**
   * ProposicaoCountOutputType without action
   */
  export type ProposicaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProposicaoCountOutputType
     */
    select?: ProposicaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProposicaoCountOutputType without action
   */
  export type ProposicaoCountOutputTypeCountVotacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Parlamentar
   */

  export type AggregateParlamentar = {
    _count: ParlamentarCountAggregateOutputType | null
    _avg: ParlamentarAvgAggregateOutputType | null
    _sum: ParlamentarSumAggregateOutputType | null
    _min: ParlamentarMinAggregateOutputType | null
    _max: ParlamentarMaxAggregateOutputType | null
  }

  export type ParlamentarAvgAggregateOutputType = {
    idOriginal: number | null
    legislatura: number | null
  }

  export type ParlamentarSumAggregateOutputType = {
    idOriginal: number | null
    legislatura: number | null
  }

  export type ParlamentarMinAggregateOutputType = {
    id: string | null
    idOriginal: number | null
    camara: string | null
    nome: string | null
    nomeCompleto: string | null
    partido: string | null
    uf: string | null
    foto: string | null
    slug: string | null
    email: string | null
    legislatura: number | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParlamentarMaxAggregateOutputType = {
    id: string | null
    idOriginal: number | null
    camara: string | null
    nome: string | null
    nomeCompleto: string | null
    partido: string | null
    uf: string | null
    foto: string | null
    slug: string | null
    email: string | null
    legislatura: number | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParlamentarCountAggregateOutputType = {
    id: number
    idOriginal: number
    camara: number
    nome: number
    nomeCompleto: number
    partido: number
    uf: number
    foto: number
    slug: number
    email: number
    legislatura: number
    syncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParlamentarAvgAggregateInputType = {
    idOriginal?: true
    legislatura?: true
  }

  export type ParlamentarSumAggregateInputType = {
    idOriginal?: true
    legislatura?: true
  }

  export type ParlamentarMinAggregateInputType = {
    id?: true
    idOriginal?: true
    camara?: true
    nome?: true
    nomeCompleto?: true
    partido?: true
    uf?: true
    foto?: true
    slug?: true
    email?: true
    legislatura?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParlamentarMaxAggregateInputType = {
    id?: true
    idOriginal?: true
    camara?: true
    nome?: true
    nomeCompleto?: true
    partido?: true
    uf?: true
    foto?: true
    slug?: true
    email?: true
    legislatura?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParlamentarCountAggregateInputType = {
    id?: true
    idOriginal?: true
    camara?: true
    nome?: true
    nomeCompleto?: true
    partido?: true
    uf?: true
    foto?: true
    slug?: true
    email?: true
    legislatura?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParlamentarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parlamentar to aggregate.
     */
    where?: ParlamentarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parlamentars to fetch.
     */
    orderBy?: ParlamentarOrderByWithRelationInput | ParlamentarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParlamentarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parlamentars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parlamentars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parlamentars
    **/
    _count?: true | ParlamentarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParlamentarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParlamentarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParlamentarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParlamentarMaxAggregateInputType
  }

  export type GetParlamentarAggregateType<T extends ParlamentarAggregateArgs> = {
        [P in keyof T & keyof AggregateParlamentar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParlamentar[P]>
      : GetScalarType<T[P], AggregateParlamentar[P]>
  }




  export type ParlamentarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParlamentarWhereInput
    orderBy?: ParlamentarOrderByWithAggregationInput | ParlamentarOrderByWithAggregationInput[]
    by: ParlamentarScalarFieldEnum[] | ParlamentarScalarFieldEnum
    having?: ParlamentarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParlamentarCountAggregateInputType | true
    _avg?: ParlamentarAvgAggregateInputType
    _sum?: ParlamentarSumAggregateInputType
    _min?: ParlamentarMinAggregateInputType
    _max?: ParlamentarMaxAggregateInputType
  }

  export type ParlamentarGroupByOutputType = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email: string | null
    legislatura: number
    syncedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: ParlamentarCountAggregateOutputType | null
    _avg: ParlamentarAvgAggregateOutputType | null
    _sum: ParlamentarSumAggregateOutputType | null
    _min: ParlamentarMinAggregateOutputType | null
    _max: ParlamentarMaxAggregateOutputType | null
  }

  type GetParlamentarGroupByPayload<T extends ParlamentarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParlamentarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParlamentarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParlamentarGroupByOutputType[P]>
            : GetScalarType<T[P], ParlamentarGroupByOutputType[P]>
        }
      >
    >


  export type ParlamentarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idOriginal?: boolean
    camara?: boolean
    nome?: boolean
    nomeCompleto?: boolean
    partido?: boolean
    uf?: boolean
    foto?: boolean
    slug?: boolean
    email?: boolean
    legislatura?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    votos?: boolean | Parlamentar$votosArgs<ExtArgs>
    proposicoes?: boolean | Parlamentar$proposicoesArgs<ExtArgs>
    _count?: boolean | ParlamentarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parlamentar"]>

  export type ParlamentarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idOriginal?: boolean
    camara?: boolean
    nome?: boolean
    nomeCompleto?: boolean
    partido?: boolean
    uf?: boolean
    foto?: boolean
    slug?: boolean
    email?: boolean
    legislatura?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parlamentar"]>

  export type ParlamentarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idOriginal?: boolean
    camara?: boolean
    nome?: boolean
    nomeCompleto?: boolean
    partido?: boolean
    uf?: boolean
    foto?: boolean
    slug?: boolean
    email?: boolean
    legislatura?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parlamentar"]>

  export type ParlamentarSelectScalar = {
    id?: boolean
    idOriginal?: boolean
    camara?: boolean
    nome?: boolean
    nomeCompleto?: boolean
    partido?: boolean
    uf?: boolean
    foto?: boolean
    slug?: boolean
    email?: boolean
    legislatura?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParlamentarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idOriginal" | "camara" | "nome" | "nomeCompleto" | "partido" | "uf" | "foto" | "slug" | "email" | "legislatura" | "syncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["parlamentar"]>
  export type ParlamentarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votos?: boolean | Parlamentar$votosArgs<ExtArgs>
    proposicoes?: boolean | Parlamentar$proposicoesArgs<ExtArgs>
    _count?: boolean | ParlamentarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParlamentarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ParlamentarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ParlamentarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parlamentar"
    objects: {
      votos: Prisma.$VoteRecordPayload<ExtArgs>[]
      proposicoes: Prisma.$ProposicaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idOriginal: number
      camara: string
      nome: string
      nomeCompleto: string
      partido: string
      uf: string
      foto: string
      slug: string
      email: string | null
      legislatura: number
      syncedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parlamentar"]>
    composites: {}
  }

  type ParlamentarGetPayload<S extends boolean | null | undefined | ParlamentarDefaultArgs> = $Result.GetResult<Prisma.$ParlamentarPayload, S>

  type ParlamentarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParlamentarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParlamentarCountAggregateInputType | true
    }

  export interface ParlamentarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parlamentar'], meta: { name: 'Parlamentar' } }
    /**
     * Find zero or one Parlamentar that matches the filter.
     * @param {ParlamentarFindUniqueArgs} args - Arguments to find a Parlamentar
     * @example
     * // Get one Parlamentar
     * const parlamentar = await prisma.parlamentar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParlamentarFindUniqueArgs>(args: SelectSubset<T, ParlamentarFindUniqueArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parlamentar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParlamentarFindUniqueOrThrowArgs} args - Arguments to find a Parlamentar
     * @example
     * // Get one Parlamentar
     * const parlamentar = await prisma.parlamentar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParlamentarFindUniqueOrThrowArgs>(args: SelectSubset<T, ParlamentarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parlamentar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarFindFirstArgs} args - Arguments to find a Parlamentar
     * @example
     * // Get one Parlamentar
     * const parlamentar = await prisma.parlamentar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParlamentarFindFirstArgs>(args?: SelectSubset<T, ParlamentarFindFirstArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parlamentar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarFindFirstOrThrowArgs} args - Arguments to find a Parlamentar
     * @example
     * // Get one Parlamentar
     * const parlamentar = await prisma.parlamentar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParlamentarFindFirstOrThrowArgs>(args?: SelectSubset<T, ParlamentarFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parlamentars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parlamentars
     * const parlamentars = await prisma.parlamentar.findMany()
     * 
     * // Get first 10 Parlamentars
     * const parlamentars = await prisma.parlamentar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parlamentarWithIdOnly = await prisma.parlamentar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParlamentarFindManyArgs>(args?: SelectSubset<T, ParlamentarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parlamentar.
     * @param {ParlamentarCreateArgs} args - Arguments to create a Parlamentar.
     * @example
     * // Create one Parlamentar
     * const Parlamentar = await prisma.parlamentar.create({
     *   data: {
     *     // ... data to create a Parlamentar
     *   }
     * })
     * 
     */
    create<T extends ParlamentarCreateArgs>(args: SelectSubset<T, ParlamentarCreateArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parlamentars.
     * @param {ParlamentarCreateManyArgs} args - Arguments to create many Parlamentars.
     * @example
     * // Create many Parlamentars
     * const parlamentar = await prisma.parlamentar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParlamentarCreateManyArgs>(args?: SelectSubset<T, ParlamentarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parlamentars and returns the data saved in the database.
     * @param {ParlamentarCreateManyAndReturnArgs} args - Arguments to create many Parlamentars.
     * @example
     * // Create many Parlamentars
     * const parlamentar = await prisma.parlamentar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parlamentars and only return the `id`
     * const parlamentarWithIdOnly = await prisma.parlamentar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParlamentarCreateManyAndReturnArgs>(args?: SelectSubset<T, ParlamentarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Parlamentar.
     * @param {ParlamentarDeleteArgs} args - Arguments to delete one Parlamentar.
     * @example
     * // Delete one Parlamentar
     * const Parlamentar = await prisma.parlamentar.delete({
     *   where: {
     *     // ... filter to delete one Parlamentar
     *   }
     * })
     * 
     */
    delete<T extends ParlamentarDeleteArgs>(args: SelectSubset<T, ParlamentarDeleteArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parlamentar.
     * @param {ParlamentarUpdateArgs} args - Arguments to update one Parlamentar.
     * @example
     * // Update one Parlamentar
     * const parlamentar = await prisma.parlamentar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParlamentarUpdateArgs>(args: SelectSubset<T, ParlamentarUpdateArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parlamentars.
     * @param {ParlamentarDeleteManyArgs} args - Arguments to filter Parlamentars to delete.
     * @example
     * // Delete a few Parlamentars
     * const { count } = await prisma.parlamentar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParlamentarDeleteManyArgs>(args?: SelectSubset<T, ParlamentarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parlamentars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parlamentars
     * const parlamentar = await prisma.parlamentar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParlamentarUpdateManyArgs>(args: SelectSubset<T, ParlamentarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parlamentars and returns the data updated in the database.
     * @param {ParlamentarUpdateManyAndReturnArgs} args - Arguments to update many Parlamentars.
     * @example
     * // Update many Parlamentars
     * const parlamentar = await prisma.parlamentar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parlamentars and only return the `id`
     * const parlamentarWithIdOnly = await prisma.parlamentar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParlamentarUpdateManyAndReturnArgs>(args: SelectSubset<T, ParlamentarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Parlamentar.
     * @param {ParlamentarUpsertArgs} args - Arguments to update or create a Parlamentar.
     * @example
     * // Update or create a Parlamentar
     * const parlamentar = await prisma.parlamentar.upsert({
     *   create: {
     *     // ... data to create a Parlamentar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parlamentar we want to update
     *   }
     * })
     */
    upsert<T extends ParlamentarUpsertArgs>(args: SelectSubset<T, ParlamentarUpsertArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parlamentars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarCountArgs} args - Arguments to filter Parlamentars to count.
     * @example
     * // Count the number of Parlamentars
     * const count = await prisma.parlamentar.count({
     *   where: {
     *     // ... the filter for the Parlamentars we want to count
     *   }
     * })
    **/
    count<T extends ParlamentarCountArgs>(
      args?: Subset<T, ParlamentarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParlamentarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parlamentar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParlamentarAggregateArgs>(args: Subset<T, ParlamentarAggregateArgs>): Prisma.PrismaPromise<GetParlamentarAggregateType<T>>

    /**
     * Group by Parlamentar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParlamentarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParlamentarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParlamentarGroupByArgs['orderBy'] }
        : { orderBy?: ParlamentarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParlamentarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParlamentarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parlamentar model
   */
  readonly fields: ParlamentarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parlamentar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParlamentarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    votos<T extends Parlamentar$votosArgs<ExtArgs> = {}>(args?: Subset<T, Parlamentar$votosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proposicoes<T extends Parlamentar$proposicoesArgs<ExtArgs> = {}>(args?: Subset<T, Parlamentar$proposicoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Parlamentar model
   */
  interface ParlamentarFieldRefs {
    readonly id: FieldRef<"Parlamentar", 'String'>
    readonly idOriginal: FieldRef<"Parlamentar", 'Int'>
    readonly camara: FieldRef<"Parlamentar", 'String'>
    readonly nome: FieldRef<"Parlamentar", 'String'>
    readonly nomeCompleto: FieldRef<"Parlamentar", 'String'>
    readonly partido: FieldRef<"Parlamentar", 'String'>
    readonly uf: FieldRef<"Parlamentar", 'String'>
    readonly foto: FieldRef<"Parlamentar", 'String'>
    readonly slug: FieldRef<"Parlamentar", 'String'>
    readonly email: FieldRef<"Parlamentar", 'String'>
    readonly legislatura: FieldRef<"Parlamentar", 'Int'>
    readonly syncedAt: FieldRef<"Parlamentar", 'DateTime'>
    readonly createdAt: FieldRef<"Parlamentar", 'DateTime'>
    readonly updatedAt: FieldRef<"Parlamentar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Parlamentar findUnique
   */
  export type ParlamentarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * Filter, which Parlamentar to fetch.
     */
    where: ParlamentarWhereUniqueInput
  }

  /**
   * Parlamentar findUniqueOrThrow
   */
  export type ParlamentarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * Filter, which Parlamentar to fetch.
     */
    where: ParlamentarWhereUniqueInput
  }

  /**
   * Parlamentar findFirst
   */
  export type ParlamentarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * Filter, which Parlamentar to fetch.
     */
    where?: ParlamentarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parlamentars to fetch.
     */
    orderBy?: ParlamentarOrderByWithRelationInput | ParlamentarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parlamentars.
     */
    cursor?: ParlamentarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parlamentars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parlamentars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parlamentars.
     */
    distinct?: ParlamentarScalarFieldEnum | ParlamentarScalarFieldEnum[]
  }

  /**
   * Parlamentar findFirstOrThrow
   */
  export type ParlamentarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * Filter, which Parlamentar to fetch.
     */
    where?: ParlamentarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parlamentars to fetch.
     */
    orderBy?: ParlamentarOrderByWithRelationInput | ParlamentarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parlamentars.
     */
    cursor?: ParlamentarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parlamentars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parlamentars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parlamentars.
     */
    distinct?: ParlamentarScalarFieldEnum | ParlamentarScalarFieldEnum[]
  }

  /**
   * Parlamentar findMany
   */
  export type ParlamentarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * Filter, which Parlamentars to fetch.
     */
    where?: ParlamentarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parlamentars to fetch.
     */
    orderBy?: ParlamentarOrderByWithRelationInput | ParlamentarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parlamentars.
     */
    cursor?: ParlamentarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parlamentars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parlamentars.
     */
    skip?: number
    distinct?: ParlamentarScalarFieldEnum | ParlamentarScalarFieldEnum[]
  }

  /**
   * Parlamentar create
   */
  export type ParlamentarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * The data needed to create a Parlamentar.
     */
    data: XOR<ParlamentarCreateInput, ParlamentarUncheckedCreateInput>
  }

  /**
   * Parlamentar createMany
   */
  export type ParlamentarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parlamentars.
     */
    data: ParlamentarCreateManyInput | ParlamentarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parlamentar createManyAndReturn
   */
  export type ParlamentarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * The data used to create many Parlamentars.
     */
    data: ParlamentarCreateManyInput | ParlamentarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parlamentar update
   */
  export type ParlamentarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * The data needed to update a Parlamentar.
     */
    data: XOR<ParlamentarUpdateInput, ParlamentarUncheckedUpdateInput>
    /**
     * Choose, which Parlamentar to update.
     */
    where: ParlamentarWhereUniqueInput
  }

  /**
   * Parlamentar updateMany
   */
  export type ParlamentarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parlamentars.
     */
    data: XOR<ParlamentarUpdateManyMutationInput, ParlamentarUncheckedUpdateManyInput>
    /**
     * Filter which Parlamentars to update
     */
    where?: ParlamentarWhereInput
    /**
     * Limit how many Parlamentars to update.
     */
    limit?: number
  }

  /**
   * Parlamentar updateManyAndReturn
   */
  export type ParlamentarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * The data used to update Parlamentars.
     */
    data: XOR<ParlamentarUpdateManyMutationInput, ParlamentarUncheckedUpdateManyInput>
    /**
     * Filter which Parlamentars to update
     */
    where?: ParlamentarWhereInput
    /**
     * Limit how many Parlamentars to update.
     */
    limit?: number
  }

  /**
   * Parlamentar upsert
   */
  export type ParlamentarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * The filter to search for the Parlamentar to update in case it exists.
     */
    where: ParlamentarWhereUniqueInput
    /**
     * In case the Parlamentar found by the `where` argument doesn't exist, create a new Parlamentar with this data.
     */
    create: XOR<ParlamentarCreateInput, ParlamentarUncheckedCreateInput>
    /**
     * In case the Parlamentar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParlamentarUpdateInput, ParlamentarUncheckedUpdateInput>
  }

  /**
   * Parlamentar delete
   */
  export type ParlamentarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    /**
     * Filter which Parlamentar to delete.
     */
    where: ParlamentarWhereUniqueInput
  }

  /**
   * Parlamentar deleteMany
   */
  export type ParlamentarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parlamentars to delete
     */
    where?: ParlamentarWhereInput
    /**
     * Limit how many Parlamentars to delete.
     */
    limit?: number
  }

  /**
   * Parlamentar.votos
   */
  export type Parlamentar$votosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    where?: VoteRecordWhereInput
    orderBy?: VoteRecordOrderByWithRelationInput | VoteRecordOrderByWithRelationInput[]
    cursor?: VoteRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteRecordScalarFieldEnum | VoteRecordScalarFieldEnum[]
  }

  /**
   * Parlamentar.proposicoes
   */
  export type Parlamentar$proposicoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    where?: ProposicaoWhereInput
    orderBy?: ProposicaoOrderByWithRelationInput | ProposicaoOrderByWithRelationInput[]
    cursor?: ProposicaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProposicaoScalarFieldEnum | ProposicaoScalarFieldEnum[]
  }

  /**
   * Parlamentar without action
   */
  export type ParlamentarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
  }


  /**
   * Model VoteEvent
   */

  export type AggregateVoteEvent = {
    _count: VoteEventCountAggregateOutputType | null
    _min: VoteEventMinAggregateOutputType | null
    _max: VoteEventMaxAggregateOutputType | null
  }

  export type VoteEventMinAggregateOutputType = {
    id: string | null
    externalId: string | null
    data: Date | null
    descricao: string | null
    resultado: string | null
    camara: string | null
    proposicaoId: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoteEventMaxAggregateOutputType = {
    id: string | null
    externalId: string | null
    data: Date | null
    descricao: string | null
    resultado: string | null
    camara: string | null
    proposicaoId: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoteEventCountAggregateOutputType = {
    id: number
    externalId: number
    data: number
    descricao: number
    resultado: number
    camara: number
    proposicaoId: number
    syncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VoteEventMinAggregateInputType = {
    id?: true
    externalId?: true
    data?: true
    descricao?: true
    resultado?: true
    camara?: true
    proposicaoId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoteEventMaxAggregateInputType = {
    id?: true
    externalId?: true
    data?: true
    descricao?: true
    resultado?: true
    camara?: true
    proposicaoId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoteEventCountAggregateInputType = {
    id?: true
    externalId?: true
    data?: true
    descricao?: true
    resultado?: true
    camara?: true
    proposicaoId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VoteEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoteEvent to aggregate.
     */
    where?: VoteEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteEvents to fetch.
     */
    orderBy?: VoteEventOrderByWithRelationInput | VoteEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VoteEvents
    **/
    _count?: true | VoteEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteEventMaxAggregateInputType
  }

  export type GetVoteEventAggregateType<T extends VoteEventAggregateArgs> = {
        [P in keyof T & keyof AggregateVoteEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoteEvent[P]>
      : GetScalarType<T[P], AggregateVoteEvent[P]>
  }




  export type VoteEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteEventWhereInput
    orderBy?: VoteEventOrderByWithAggregationInput | VoteEventOrderByWithAggregationInput[]
    by: VoteEventScalarFieldEnum[] | VoteEventScalarFieldEnum
    having?: VoteEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteEventCountAggregateInputType | true
    _min?: VoteEventMinAggregateInputType
    _max?: VoteEventMaxAggregateInputType
  }

  export type VoteEventGroupByOutputType = {
    id: string
    externalId: string
    data: Date
    descricao: string
    resultado: string | null
    camara: string
    proposicaoId: string | null
    syncedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VoteEventCountAggregateOutputType | null
    _min: VoteEventMinAggregateOutputType | null
    _max: VoteEventMaxAggregateOutputType | null
  }

  type GetVoteEventGroupByPayload<T extends VoteEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteEventGroupByOutputType[P]>
            : GetScalarType<T[P], VoteEventGroupByOutputType[P]>
        }
      >
    >


  export type VoteEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    data?: boolean
    descricao?: boolean
    resultado?: boolean
    camara?: boolean
    proposicaoId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    proposicao?: boolean | VoteEvent$proposicaoArgs<ExtArgs>
    votos?: boolean | VoteEvent$votosArgs<ExtArgs>
    _count?: boolean | VoteEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voteEvent"]>

  export type VoteEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    data?: boolean
    descricao?: boolean
    resultado?: boolean
    camara?: boolean
    proposicaoId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    proposicao?: boolean | VoteEvent$proposicaoArgs<ExtArgs>
  }, ExtArgs["result"]["voteEvent"]>

  export type VoteEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    data?: boolean
    descricao?: boolean
    resultado?: boolean
    camara?: boolean
    proposicaoId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    proposicao?: boolean | VoteEvent$proposicaoArgs<ExtArgs>
  }, ExtArgs["result"]["voteEvent"]>

  export type VoteEventSelectScalar = {
    id?: boolean
    externalId?: boolean
    data?: boolean
    descricao?: boolean
    resultado?: boolean
    camara?: boolean
    proposicaoId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VoteEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "data" | "descricao" | "resultado" | "camara" | "proposicaoId" | "syncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["voteEvent"]>
  export type VoteEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proposicao?: boolean | VoteEvent$proposicaoArgs<ExtArgs>
    votos?: boolean | VoteEvent$votosArgs<ExtArgs>
    _count?: boolean | VoteEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VoteEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proposicao?: boolean | VoteEvent$proposicaoArgs<ExtArgs>
  }
  export type VoteEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proposicao?: boolean | VoteEvent$proposicaoArgs<ExtArgs>
  }

  export type $VoteEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VoteEvent"
    objects: {
      proposicao: Prisma.$ProposicaoPayload<ExtArgs> | null
      votos: Prisma.$VoteRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalId: string
      data: Date
      descricao: string
      resultado: string | null
      camara: string
      proposicaoId: string | null
      syncedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["voteEvent"]>
    composites: {}
  }

  type VoteEventGetPayload<S extends boolean | null | undefined | VoteEventDefaultArgs> = $Result.GetResult<Prisma.$VoteEventPayload, S>

  type VoteEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteEventCountAggregateInputType | true
    }

  export interface VoteEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VoteEvent'], meta: { name: 'VoteEvent' } }
    /**
     * Find zero or one VoteEvent that matches the filter.
     * @param {VoteEventFindUniqueArgs} args - Arguments to find a VoteEvent
     * @example
     * // Get one VoteEvent
     * const voteEvent = await prisma.voteEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteEventFindUniqueArgs>(args: SelectSubset<T, VoteEventFindUniqueArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VoteEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteEventFindUniqueOrThrowArgs} args - Arguments to find a VoteEvent
     * @example
     * // Get one VoteEvent
     * const voteEvent = await prisma.voteEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteEventFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VoteEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventFindFirstArgs} args - Arguments to find a VoteEvent
     * @example
     * // Get one VoteEvent
     * const voteEvent = await prisma.voteEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteEventFindFirstArgs>(args?: SelectSubset<T, VoteEventFindFirstArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VoteEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventFindFirstOrThrowArgs} args - Arguments to find a VoteEvent
     * @example
     * // Get one VoteEvent
     * const voteEvent = await prisma.voteEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteEventFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VoteEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VoteEvents
     * const voteEvents = await prisma.voteEvent.findMany()
     * 
     * // Get first 10 VoteEvents
     * const voteEvents = await prisma.voteEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteEventWithIdOnly = await prisma.voteEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteEventFindManyArgs>(args?: SelectSubset<T, VoteEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VoteEvent.
     * @param {VoteEventCreateArgs} args - Arguments to create a VoteEvent.
     * @example
     * // Create one VoteEvent
     * const VoteEvent = await prisma.voteEvent.create({
     *   data: {
     *     // ... data to create a VoteEvent
     *   }
     * })
     * 
     */
    create<T extends VoteEventCreateArgs>(args: SelectSubset<T, VoteEventCreateArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VoteEvents.
     * @param {VoteEventCreateManyArgs} args - Arguments to create many VoteEvents.
     * @example
     * // Create many VoteEvents
     * const voteEvent = await prisma.voteEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteEventCreateManyArgs>(args?: SelectSubset<T, VoteEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VoteEvents and returns the data saved in the database.
     * @param {VoteEventCreateManyAndReturnArgs} args - Arguments to create many VoteEvents.
     * @example
     * // Create many VoteEvents
     * const voteEvent = await prisma.voteEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VoteEvents and only return the `id`
     * const voteEventWithIdOnly = await prisma.voteEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteEventCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VoteEvent.
     * @param {VoteEventDeleteArgs} args - Arguments to delete one VoteEvent.
     * @example
     * // Delete one VoteEvent
     * const VoteEvent = await prisma.voteEvent.delete({
     *   where: {
     *     // ... filter to delete one VoteEvent
     *   }
     * })
     * 
     */
    delete<T extends VoteEventDeleteArgs>(args: SelectSubset<T, VoteEventDeleteArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VoteEvent.
     * @param {VoteEventUpdateArgs} args - Arguments to update one VoteEvent.
     * @example
     * // Update one VoteEvent
     * const voteEvent = await prisma.voteEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteEventUpdateArgs>(args: SelectSubset<T, VoteEventUpdateArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VoteEvents.
     * @param {VoteEventDeleteManyArgs} args - Arguments to filter VoteEvents to delete.
     * @example
     * // Delete a few VoteEvents
     * const { count } = await prisma.voteEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteEventDeleteManyArgs>(args?: SelectSubset<T, VoteEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoteEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VoteEvents
     * const voteEvent = await prisma.voteEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteEventUpdateManyArgs>(args: SelectSubset<T, VoteEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoteEvents and returns the data updated in the database.
     * @param {VoteEventUpdateManyAndReturnArgs} args - Arguments to update many VoteEvents.
     * @example
     * // Update many VoteEvents
     * const voteEvent = await prisma.voteEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VoteEvents and only return the `id`
     * const voteEventWithIdOnly = await prisma.voteEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoteEventUpdateManyAndReturnArgs>(args: SelectSubset<T, VoteEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VoteEvent.
     * @param {VoteEventUpsertArgs} args - Arguments to update or create a VoteEvent.
     * @example
     * // Update or create a VoteEvent
     * const voteEvent = await prisma.voteEvent.upsert({
     *   create: {
     *     // ... data to create a VoteEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VoteEvent we want to update
     *   }
     * })
     */
    upsert<T extends VoteEventUpsertArgs>(args: SelectSubset<T, VoteEventUpsertArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VoteEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventCountArgs} args - Arguments to filter VoteEvents to count.
     * @example
     * // Count the number of VoteEvents
     * const count = await prisma.voteEvent.count({
     *   where: {
     *     // ... the filter for the VoteEvents we want to count
     *   }
     * })
    **/
    count<T extends VoteEventCountArgs>(
      args?: Subset<T, VoteEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VoteEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteEventAggregateArgs>(args: Subset<T, VoteEventAggregateArgs>): Prisma.PrismaPromise<GetVoteEventAggregateType<T>>

    /**
     * Group by VoteEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteEventGroupByArgs['orderBy'] }
        : { orderBy?: VoteEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VoteEvent model
   */
  readonly fields: VoteEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VoteEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proposicao<T extends VoteEvent$proposicaoArgs<ExtArgs> = {}>(args?: Subset<T, VoteEvent$proposicaoArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    votos<T extends VoteEvent$votosArgs<ExtArgs> = {}>(args?: Subset<T, VoteEvent$votosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VoteEvent model
   */
  interface VoteEventFieldRefs {
    readonly id: FieldRef<"VoteEvent", 'String'>
    readonly externalId: FieldRef<"VoteEvent", 'String'>
    readonly data: FieldRef<"VoteEvent", 'DateTime'>
    readonly descricao: FieldRef<"VoteEvent", 'String'>
    readonly resultado: FieldRef<"VoteEvent", 'String'>
    readonly camara: FieldRef<"VoteEvent", 'String'>
    readonly proposicaoId: FieldRef<"VoteEvent", 'String'>
    readonly syncedAt: FieldRef<"VoteEvent", 'DateTime'>
    readonly createdAt: FieldRef<"VoteEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"VoteEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VoteEvent findUnique
   */
  export type VoteEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * Filter, which VoteEvent to fetch.
     */
    where: VoteEventWhereUniqueInput
  }

  /**
   * VoteEvent findUniqueOrThrow
   */
  export type VoteEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * Filter, which VoteEvent to fetch.
     */
    where: VoteEventWhereUniqueInput
  }

  /**
   * VoteEvent findFirst
   */
  export type VoteEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * Filter, which VoteEvent to fetch.
     */
    where?: VoteEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteEvents to fetch.
     */
    orderBy?: VoteEventOrderByWithRelationInput | VoteEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoteEvents.
     */
    cursor?: VoteEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoteEvents.
     */
    distinct?: VoteEventScalarFieldEnum | VoteEventScalarFieldEnum[]
  }

  /**
   * VoteEvent findFirstOrThrow
   */
  export type VoteEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * Filter, which VoteEvent to fetch.
     */
    where?: VoteEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteEvents to fetch.
     */
    orderBy?: VoteEventOrderByWithRelationInput | VoteEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoteEvents.
     */
    cursor?: VoteEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoteEvents.
     */
    distinct?: VoteEventScalarFieldEnum | VoteEventScalarFieldEnum[]
  }

  /**
   * VoteEvent findMany
   */
  export type VoteEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * Filter, which VoteEvents to fetch.
     */
    where?: VoteEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteEvents to fetch.
     */
    orderBy?: VoteEventOrderByWithRelationInput | VoteEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VoteEvents.
     */
    cursor?: VoteEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteEvents.
     */
    skip?: number
    distinct?: VoteEventScalarFieldEnum | VoteEventScalarFieldEnum[]
  }

  /**
   * VoteEvent create
   */
  export type VoteEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * The data needed to create a VoteEvent.
     */
    data: XOR<VoteEventCreateInput, VoteEventUncheckedCreateInput>
  }

  /**
   * VoteEvent createMany
   */
  export type VoteEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VoteEvents.
     */
    data: VoteEventCreateManyInput | VoteEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VoteEvent createManyAndReturn
   */
  export type VoteEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * The data used to create many VoteEvents.
     */
    data: VoteEventCreateManyInput | VoteEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoteEvent update
   */
  export type VoteEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * The data needed to update a VoteEvent.
     */
    data: XOR<VoteEventUpdateInput, VoteEventUncheckedUpdateInput>
    /**
     * Choose, which VoteEvent to update.
     */
    where: VoteEventWhereUniqueInput
  }

  /**
   * VoteEvent updateMany
   */
  export type VoteEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VoteEvents.
     */
    data: XOR<VoteEventUpdateManyMutationInput, VoteEventUncheckedUpdateManyInput>
    /**
     * Filter which VoteEvents to update
     */
    where?: VoteEventWhereInput
    /**
     * Limit how many VoteEvents to update.
     */
    limit?: number
  }

  /**
   * VoteEvent updateManyAndReturn
   */
  export type VoteEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * The data used to update VoteEvents.
     */
    data: XOR<VoteEventUpdateManyMutationInput, VoteEventUncheckedUpdateManyInput>
    /**
     * Filter which VoteEvents to update
     */
    where?: VoteEventWhereInput
    /**
     * Limit how many VoteEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoteEvent upsert
   */
  export type VoteEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * The filter to search for the VoteEvent to update in case it exists.
     */
    where: VoteEventWhereUniqueInput
    /**
     * In case the VoteEvent found by the `where` argument doesn't exist, create a new VoteEvent with this data.
     */
    create: XOR<VoteEventCreateInput, VoteEventUncheckedCreateInput>
    /**
     * In case the VoteEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteEventUpdateInput, VoteEventUncheckedUpdateInput>
  }

  /**
   * VoteEvent delete
   */
  export type VoteEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    /**
     * Filter which VoteEvent to delete.
     */
    where: VoteEventWhereUniqueInput
  }

  /**
   * VoteEvent deleteMany
   */
  export type VoteEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoteEvents to delete
     */
    where?: VoteEventWhereInput
    /**
     * Limit how many VoteEvents to delete.
     */
    limit?: number
  }

  /**
   * VoteEvent.proposicao
   */
  export type VoteEvent$proposicaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    where?: ProposicaoWhereInput
  }

  /**
   * VoteEvent.votos
   */
  export type VoteEvent$votosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    where?: VoteRecordWhereInput
    orderBy?: VoteRecordOrderByWithRelationInput | VoteRecordOrderByWithRelationInput[]
    cursor?: VoteRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteRecordScalarFieldEnum | VoteRecordScalarFieldEnum[]
  }

  /**
   * VoteEvent without action
   */
  export type VoteEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
  }


  /**
   * Model VoteRecord
   */

  export type AggregateVoteRecord = {
    _count: VoteRecordCountAggregateOutputType | null
    _min: VoteRecordMinAggregateOutputType | null
    _max: VoteRecordMaxAggregateOutputType | null
  }

  export type VoteRecordMinAggregateOutputType = {
    id: string | null
    voto: string | null
    parlamentarId: string | null
    votacaoId: string | null
    data: Date | null
    createdAt: Date | null
  }

  export type VoteRecordMaxAggregateOutputType = {
    id: string | null
    voto: string | null
    parlamentarId: string | null
    votacaoId: string | null
    data: Date | null
    createdAt: Date | null
  }

  export type VoteRecordCountAggregateOutputType = {
    id: number
    voto: number
    parlamentarId: number
    votacaoId: number
    data: number
    createdAt: number
    _all: number
  }


  export type VoteRecordMinAggregateInputType = {
    id?: true
    voto?: true
    parlamentarId?: true
    votacaoId?: true
    data?: true
    createdAt?: true
  }

  export type VoteRecordMaxAggregateInputType = {
    id?: true
    voto?: true
    parlamentarId?: true
    votacaoId?: true
    data?: true
    createdAt?: true
  }

  export type VoteRecordCountAggregateInputType = {
    id?: true
    voto?: true
    parlamentarId?: true
    votacaoId?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type VoteRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoteRecord to aggregate.
     */
    where?: VoteRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteRecords to fetch.
     */
    orderBy?: VoteRecordOrderByWithRelationInput | VoteRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VoteRecords
    **/
    _count?: true | VoteRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteRecordMaxAggregateInputType
  }

  export type GetVoteRecordAggregateType<T extends VoteRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateVoteRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoteRecord[P]>
      : GetScalarType<T[P], AggregateVoteRecord[P]>
  }




  export type VoteRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteRecordWhereInput
    orderBy?: VoteRecordOrderByWithAggregationInput | VoteRecordOrderByWithAggregationInput[]
    by: VoteRecordScalarFieldEnum[] | VoteRecordScalarFieldEnum
    having?: VoteRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteRecordCountAggregateInputType | true
    _min?: VoteRecordMinAggregateInputType
    _max?: VoteRecordMaxAggregateInputType
  }

  export type VoteRecordGroupByOutputType = {
    id: string
    voto: string
    parlamentarId: string
    votacaoId: string
    data: Date
    createdAt: Date
    _count: VoteRecordCountAggregateOutputType | null
    _min: VoteRecordMinAggregateOutputType | null
    _max: VoteRecordMaxAggregateOutputType | null
  }

  type GetVoteRecordGroupByPayload<T extends VoteRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteRecordGroupByOutputType[P]>
            : GetScalarType<T[P], VoteRecordGroupByOutputType[P]>
        }
      >
    >


  export type VoteRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voto?: boolean
    parlamentarId?: boolean
    votacaoId?: boolean
    data?: boolean
    createdAt?: boolean
    parlamentar?: boolean | ParlamentarDefaultArgs<ExtArgs>
    votacao?: boolean | VoteEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voteRecord"]>

  export type VoteRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voto?: boolean
    parlamentarId?: boolean
    votacaoId?: boolean
    data?: boolean
    createdAt?: boolean
    parlamentar?: boolean | ParlamentarDefaultArgs<ExtArgs>
    votacao?: boolean | VoteEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voteRecord"]>

  export type VoteRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voto?: boolean
    parlamentarId?: boolean
    votacaoId?: boolean
    data?: boolean
    createdAt?: boolean
    parlamentar?: boolean | ParlamentarDefaultArgs<ExtArgs>
    votacao?: boolean | VoteEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voteRecord"]>

  export type VoteRecordSelectScalar = {
    id?: boolean
    voto?: boolean
    parlamentarId?: boolean
    votacaoId?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type VoteRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "voto" | "parlamentarId" | "votacaoId" | "data" | "createdAt", ExtArgs["result"]["voteRecord"]>
  export type VoteRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parlamentar?: boolean | ParlamentarDefaultArgs<ExtArgs>
    votacao?: boolean | VoteEventDefaultArgs<ExtArgs>
  }
  export type VoteRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parlamentar?: boolean | ParlamentarDefaultArgs<ExtArgs>
    votacao?: boolean | VoteEventDefaultArgs<ExtArgs>
  }
  export type VoteRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parlamentar?: boolean | ParlamentarDefaultArgs<ExtArgs>
    votacao?: boolean | VoteEventDefaultArgs<ExtArgs>
  }

  export type $VoteRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VoteRecord"
    objects: {
      parlamentar: Prisma.$ParlamentarPayload<ExtArgs>
      votacao: Prisma.$VoteEventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      voto: string
      parlamentarId: string
      votacaoId: string
      data: Date
      createdAt: Date
    }, ExtArgs["result"]["voteRecord"]>
    composites: {}
  }

  type VoteRecordGetPayload<S extends boolean | null | undefined | VoteRecordDefaultArgs> = $Result.GetResult<Prisma.$VoteRecordPayload, S>

  type VoteRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteRecordCountAggregateInputType | true
    }

  export interface VoteRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VoteRecord'], meta: { name: 'VoteRecord' } }
    /**
     * Find zero or one VoteRecord that matches the filter.
     * @param {VoteRecordFindUniqueArgs} args - Arguments to find a VoteRecord
     * @example
     * // Get one VoteRecord
     * const voteRecord = await prisma.voteRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteRecordFindUniqueArgs>(args: SelectSubset<T, VoteRecordFindUniqueArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VoteRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteRecordFindUniqueOrThrowArgs} args - Arguments to find a VoteRecord
     * @example
     * // Get one VoteRecord
     * const voteRecord = await prisma.voteRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VoteRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordFindFirstArgs} args - Arguments to find a VoteRecord
     * @example
     * // Get one VoteRecord
     * const voteRecord = await prisma.voteRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteRecordFindFirstArgs>(args?: SelectSubset<T, VoteRecordFindFirstArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VoteRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordFindFirstOrThrowArgs} args - Arguments to find a VoteRecord
     * @example
     * // Get one VoteRecord
     * const voteRecord = await prisma.voteRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VoteRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VoteRecords
     * const voteRecords = await prisma.voteRecord.findMany()
     * 
     * // Get first 10 VoteRecords
     * const voteRecords = await prisma.voteRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteRecordWithIdOnly = await prisma.voteRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteRecordFindManyArgs>(args?: SelectSubset<T, VoteRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VoteRecord.
     * @param {VoteRecordCreateArgs} args - Arguments to create a VoteRecord.
     * @example
     * // Create one VoteRecord
     * const VoteRecord = await prisma.voteRecord.create({
     *   data: {
     *     // ... data to create a VoteRecord
     *   }
     * })
     * 
     */
    create<T extends VoteRecordCreateArgs>(args: SelectSubset<T, VoteRecordCreateArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VoteRecords.
     * @param {VoteRecordCreateManyArgs} args - Arguments to create many VoteRecords.
     * @example
     * // Create many VoteRecords
     * const voteRecord = await prisma.voteRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteRecordCreateManyArgs>(args?: SelectSubset<T, VoteRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VoteRecords and returns the data saved in the database.
     * @param {VoteRecordCreateManyAndReturnArgs} args - Arguments to create many VoteRecords.
     * @example
     * // Create many VoteRecords
     * const voteRecord = await prisma.voteRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VoteRecords and only return the `id`
     * const voteRecordWithIdOnly = await prisma.voteRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VoteRecord.
     * @param {VoteRecordDeleteArgs} args - Arguments to delete one VoteRecord.
     * @example
     * // Delete one VoteRecord
     * const VoteRecord = await prisma.voteRecord.delete({
     *   where: {
     *     // ... filter to delete one VoteRecord
     *   }
     * })
     * 
     */
    delete<T extends VoteRecordDeleteArgs>(args: SelectSubset<T, VoteRecordDeleteArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VoteRecord.
     * @param {VoteRecordUpdateArgs} args - Arguments to update one VoteRecord.
     * @example
     * // Update one VoteRecord
     * const voteRecord = await prisma.voteRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteRecordUpdateArgs>(args: SelectSubset<T, VoteRecordUpdateArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VoteRecords.
     * @param {VoteRecordDeleteManyArgs} args - Arguments to filter VoteRecords to delete.
     * @example
     * // Delete a few VoteRecords
     * const { count } = await prisma.voteRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteRecordDeleteManyArgs>(args?: SelectSubset<T, VoteRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoteRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VoteRecords
     * const voteRecord = await prisma.voteRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteRecordUpdateManyArgs>(args: SelectSubset<T, VoteRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoteRecords and returns the data updated in the database.
     * @param {VoteRecordUpdateManyAndReturnArgs} args - Arguments to update many VoteRecords.
     * @example
     * // Update many VoteRecords
     * const voteRecord = await prisma.voteRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VoteRecords and only return the `id`
     * const voteRecordWithIdOnly = await prisma.voteRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoteRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, VoteRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VoteRecord.
     * @param {VoteRecordUpsertArgs} args - Arguments to update or create a VoteRecord.
     * @example
     * // Update or create a VoteRecord
     * const voteRecord = await prisma.voteRecord.upsert({
     *   create: {
     *     // ... data to create a VoteRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VoteRecord we want to update
     *   }
     * })
     */
    upsert<T extends VoteRecordUpsertArgs>(args: SelectSubset<T, VoteRecordUpsertArgs<ExtArgs>>): Prisma__VoteRecordClient<$Result.GetResult<Prisma.$VoteRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VoteRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordCountArgs} args - Arguments to filter VoteRecords to count.
     * @example
     * // Count the number of VoteRecords
     * const count = await prisma.voteRecord.count({
     *   where: {
     *     // ... the filter for the VoteRecords we want to count
     *   }
     * })
    **/
    count<T extends VoteRecordCountArgs>(
      args?: Subset<T, VoteRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VoteRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteRecordAggregateArgs>(args: Subset<T, VoteRecordAggregateArgs>): Prisma.PrismaPromise<GetVoteRecordAggregateType<T>>

    /**
     * Group by VoteRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteRecordGroupByArgs['orderBy'] }
        : { orderBy?: VoteRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VoteRecord model
   */
  readonly fields: VoteRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VoteRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parlamentar<T extends ParlamentarDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParlamentarDefaultArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    votacao<T extends VoteEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VoteEventDefaultArgs<ExtArgs>>): Prisma__VoteEventClient<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VoteRecord model
   */
  interface VoteRecordFieldRefs {
    readonly id: FieldRef<"VoteRecord", 'String'>
    readonly voto: FieldRef<"VoteRecord", 'String'>
    readonly parlamentarId: FieldRef<"VoteRecord", 'String'>
    readonly votacaoId: FieldRef<"VoteRecord", 'String'>
    readonly data: FieldRef<"VoteRecord", 'DateTime'>
    readonly createdAt: FieldRef<"VoteRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VoteRecord findUnique
   */
  export type VoteRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * Filter, which VoteRecord to fetch.
     */
    where: VoteRecordWhereUniqueInput
  }

  /**
   * VoteRecord findUniqueOrThrow
   */
  export type VoteRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * Filter, which VoteRecord to fetch.
     */
    where: VoteRecordWhereUniqueInput
  }

  /**
   * VoteRecord findFirst
   */
  export type VoteRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * Filter, which VoteRecord to fetch.
     */
    where?: VoteRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteRecords to fetch.
     */
    orderBy?: VoteRecordOrderByWithRelationInput | VoteRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoteRecords.
     */
    cursor?: VoteRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoteRecords.
     */
    distinct?: VoteRecordScalarFieldEnum | VoteRecordScalarFieldEnum[]
  }

  /**
   * VoteRecord findFirstOrThrow
   */
  export type VoteRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * Filter, which VoteRecord to fetch.
     */
    where?: VoteRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteRecords to fetch.
     */
    orderBy?: VoteRecordOrderByWithRelationInput | VoteRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoteRecords.
     */
    cursor?: VoteRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoteRecords.
     */
    distinct?: VoteRecordScalarFieldEnum | VoteRecordScalarFieldEnum[]
  }

  /**
   * VoteRecord findMany
   */
  export type VoteRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * Filter, which VoteRecords to fetch.
     */
    where?: VoteRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoteRecords to fetch.
     */
    orderBy?: VoteRecordOrderByWithRelationInput | VoteRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VoteRecords.
     */
    cursor?: VoteRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoteRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoteRecords.
     */
    skip?: number
    distinct?: VoteRecordScalarFieldEnum | VoteRecordScalarFieldEnum[]
  }

  /**
   * VoteRecord create
   */
  export type VoteRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a VoteRecord.
     */
    data: XOR<VoteRecordCreateInput, VoteRecordUncheckedCreateInput>
  }

  /**
   * VoteRecord createMany
   */
  export type VoteRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VoteRecords.
     */
    data: VoteRecordCreateManyInput | VoteRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VoteRecord createManyAndReturn
   */
  export type VoteRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * The data used to create many VoteRecords.
     */
    data: VoteRecordCreateManyInput | VoteRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoteRecord update
   */
  export type VoteRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a VoteRecord.
     */
    data: XOR<VoteRecordUpdateInput, VoteRecordUncheckedUpdateInput>
    /**
     * Choose, which VoteRecord to update.
     */
    where: VoteRecordWhereUniqueInput
  }

  /**
   * VoteRecord updateMany
   */
  export type VoteRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VoteRecords.
     */
    data: XOR<VoteRecordUpdateManyMutationInput, VoteRecordUncheckedUpdateManyInput>
    /**
     * Filter which VoteRecords to update
     */
    where?: VoteRecordWhereInput
    /**
     * Limit how many VoteRecords to update.
     */
    limit?: number
  }

  /**
   * VoteRecord updateManyAndReturn
   */
  export type VoteRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * The data used to update VoteRecords.
     */
    data: XOR<VoteRecordUpdateManyMutationInput, VoteRecordUncheckedUpdateManyInput>
    /**
     * Filter which VoteRecords to update
     */
    where?: VoteRecordWhereInput
    /**
     * Limit how many VoteRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoteRecord upsert
   */
  export type VoteRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the VoteRecord to update in case it exists.
     */
    where: VoteRecordWhereUniqueInput
    /**
     * In case the VoteRecord found by the `where` argument doesn't exist, create a new VoteRecord with this data.
     */
    create: XOR<VoteRecordCreateInput, VoteRecordUncheckedCreateInput>
    /**
     * In case the VoteRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteRecordUpdateInput, VoteRecordUncheckedUpdateInput>
  }

  /**
   * VoteRecord delete
   */
  export type VoteRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
    /**
     * Filter which VoteRecord to delete.
     */
    where: VoteRecordWhereUniqueInput
  }

  /**
   * VoteRecord deleteMany
   */
  export type VoteRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoteRecords to delete
     */
    where?: VoteRecordWhereInput
    /**
     * Limit how many VoteRecords to delete.
     */
    limit?: number
  }

  /**
   * VoteRecord without action
   */
  export type VoteRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteRecord
     */
    select?: VoteRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteRecord
     */
    omit?: VoteRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteRecordInclude<ExtArgs> | null
  }


  /**
   * Model Proposicao
   */

  export type AggregateProposicao = {
    _count: ProposicaoCountAggregateOutputType | null
    _avg: ProposicaoAvgAggregateOutputType | null
    _sum: ProposicaoSumAggregateOutputType | null
    _min: ProposicaoMinAggregateOutputType | null
    _max: ProposicaoMaxAggregateOutputType | null
  }

  export type ProposicaoAvgAggregateOutputType = {
    externalId: number | null
    numero: number | null
    ano: number | null
  }

  export type ProposicaoSumAggregateOutputType = {
    externalId: number | null
    numero: number | null
    ano: number | null
  }

  export type ProposicaoMinAggregateOutputType = {
    id: string | null
    externalId: number | null
    tipo: string | null
    numero: number | null
    ano: number | null
    ementa: string | null
    dataApresentacao: Date | null
    urlInteiro: string | null
    camara: string | null
    autorId: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProposicaoMaxAggregateOutputType = {
    id: string | null
    externalId: number | null
    tipo: string | null
    numero: number | null
    ano: number | null
    ementa: string | null
    dataApresentacao: Date | null
    urlInteiro: string | null
    camara: string | null
    autorId: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProposicaoCountAggregateOutputType = {
    id: number
    externalId: number
    tipo: number
    numero: number
    ano: number
    ementa: number
    dataApresentacao: number
    urlInteiro: number
    camara: number
    autorId: number
    syncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProposicaoAvgAggregateInputType = {
    externalId?: true
    numero?: true
    ano?: true
  }

  export type ProposicaoSumAggregateInputType = {
    externalId?: true
    numero?: true
    ano?: true
  }

  export type ProposicaoMinAggregateInputType = {
    id?: true
    externalId?: true
    tipo?: true
    numero?: true
    ano?: true
    ementa?: true
    dataApresentacao?: true
    urlInteiro?: true
    camara?: true
    autorId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProposicaoMaxAggregateInputType = {
    id?: true
    externalId?: true
    tipo?: true
    numero?: true
    ano?: true
    ementa?: true
    dataApresentacao?: true
    urlInteiro?: true
    camara?: true
    autorId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProposicaoCountAggregateInputType = {
    id?: true
    externalId?: true
    tipo?: true
    numero?: true
    ano?: true
    ementa?: true
    dataApresentacao?: true
    urlInteiro?: true
    camara?: true
    autorId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProposicaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proposicao to aggregate.
     */
    where?: ProposicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposicaos to fetch.
     */
    orderBy?: ProposicaoOrderByWithRelationInput | ProposicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProposicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposicaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proposicaos
    **/
    _count?: true | ProposicaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProposicaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProposicaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProposicaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProposicaoMaxAggregateInputType
  }

  export type GetProposicaoAggregateType<T extends ProposicaoAggregateArgs> = {
        [P in keyof T & keyof AggregateProposicao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProposicao[P]>
      : GetScalarType<T[P], AggregateProposicao[P]>
  }




  export type ProposicaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposicaoWhereInput
    orderBy?: ProposicaoOrderByWithAggregationInput | ProposicaoOrderByWithAggregationInput[]
    by: ProposicaoScalarFieldEnum[] | ProposicaoScalarFieldEnum
    having?: ProposicaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProposicaoCountAggregateInputType | true
    _avg?: ProposicaoAvgAggregateInputType
    _sum?: ProposicaoSumAggregateInputType
    _min?: ProposicaoMinAggregateInputType
    _max?: ProposicaoMaxAggregateInputType
  }

  export type ProposicaoGroupByOutputType = {
    id: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date
    urlInteiro: string | null
    camara: string
    autorId: string | null
    syncedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: ProposicaoCountAggregateOutputType | null
    _avg: ProposicaoAvgAggregateOutputType | null
    _sum: ProposicaoSumAggregateOutputType | null
    _min: ProposicaoMinAggregateOutputType | null
    _max: ProposicaoMaxAggregateOutputType | null
  }

  type GetProposicaoGroupByPayload<T extends ProposicaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProposicaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProposicaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProposicaoGroupByOutputType[P]>
            : GetScalarType<T[P], ProposicaoGroupByOutputType[P]>
        }
      >
    >


  export type ProposicaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    tipo?: boolean
    numero?: boolean
    ano?: boolean
    ementa?: boolean
    dataApresentacao?: boolean
    urlInteiro?: boolean
    camara?: boolean
    autorId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    autor?: boolean | Proposicao$autorArgs<ExtArgs>
    votacoes?: boolean | Proposicao$votacoesArgs<ExtArgs>
    _count?: boolean | ProposicaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proposicao"]>

  export type ProposicaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    tipo?: boolean
    numero?: boolean
    ano?: boolean
    ementa?: boolean
    dataApresentacao?: boolean
    urlInteiro?: boolean
    camara?: boolean
    autorId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    autor?: boolean | Proposicao$autorArgs<ExtArgs>
  }, ExtArgs["result"]["proposicao"]>

  export type ProposicaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalId?: boolean
    tipo?: boolean
    numero?: boolean
    ano?: boolean
    ementa?: boolean
    dataApresentacao?: boolean
    urlInteiro?: boolean
    camara?: boolean
    autorId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    autor?: boolean | Proposicao$autorArgs<ExtArgs>
  }, ExtArgs["result"]["proposicao"]>

  export type ProposicaoSelectScalar = {
    id?: boolean
    externalId?: boolean
    tipo?: boolean
    numero?: boolean
    ano?: boolean
    ementa?: boolean
    dataApresentacao?: boolean
    urlInteiro?: boolean
    camara?: boolean
    autorId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProposicaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalId" | "tipo" | "numero" | "ano" | "ementa" | "dataApresentacao" | "urlInteiro" | "camara" | "autorId" | "syncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["proposicao"]>
  export type ProposicaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    autor?: boolean | Proposicao$autorArgs<ExtArgs>
    votacoes?: boolean | Proposicao$votacoesArgs<ExtArgs>
    _count?: boolean | ProposicaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProposicaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    autor?: boolean | Proposicao$autorArgs<ExtArgs>
  }
  export type ProposicaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    autor?: boolean | Proposicao$autorArgs<ExtArgs>
  }

  export type $ProposicaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proposicao"
    objects: {
      autor: Prisma.$ParlamentarPayload<ExtArgs> | null
      votacoes: Prisma.$VoteEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalId: number
      tipo: string
      numero: number
      ano: number
      ementa: string
      dataApresentacao: Date
      urlInteiro: string | null
      camara: string
      autorId: string | null
      syncedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["proposicao"]>
    composites: {}
  }

  type ProposicaoGetPayload<S extends boolean | null | undefined | ProposicaoDefaultArgs> = $Result.GetResult<Prisma.$ProposicaoPayload, S>

  type ProposicaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProposicaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProposicaoCountAggregateInputType | true
    }

  export interface ProposicaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proposicao'], meta: { name: 'Proposicao' } }
    /**
     * Find zero or one Proposicao that matches the filter.
     * @param {ProposicaoFindUniqueArgs} args - Arguments to find a Proposicao
     * @example
     * // Get one Proposicao
     * const proposicao = await prisma.proposicao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProposicaoFindUniqueArgs>(args: SelectSubset<T, ProposicaoFindUniqueArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proposicao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProposicaoFindUniqueOrThrowArgs} args - Arguments to find a Proposicao
     * @example
     * // Get one Proposicao
     * const proposicao = await prisma.proposicao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProposicaoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProposicaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proposicao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoFindFirstArgs} args - Arguments to find a Proposicao
     * @example
     * // Get one Proposicao
     * const proposicao = await prisma.proposicao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProposicaoFindFirstArgs>(args?: SelectSubset<T, ProposicaoFindFirstArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proposicao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoFindFirstOrThrowArgs} args - Arguments to find a Proposicao
     * @example
     * // Get one Proposicao
     * const proposicao = await prisma.proposicao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProposicaoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProposicaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proposicaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proposicaos
     * const proposicaos = await prisma.proposicao.findMany()
     * 
     * // Get first 10 Proposicaos
     * const proposicaos = await prisma.proposicao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proposicaoWithIdOnly = await prisma.proposicao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProposicaoFindManyArgs>(args?: SelectSubset<T, ProposicaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proposicao.
     * @param {ProposicaoCreateArgs} args - Arguments to create a Proposicao.
     * @example
     * // Create one Proposicao
     * const Proposicao = await prisma.proposicao.create({
     *   data: {
     *     // ... data to create a Proposicao
     *   }
     * })
     * 
     */
    create<T extends ProposicaoCreateArgs>(args: SelectSubset<T, ProposicaoCreateArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proposicaos.
     * @param {ProposicaoCreateManyArgs} args - Arguments to create many Proposicaos.
     * @example
     * // Create many Proposicaos
     * const proposicao = await prisma.proposicao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProposicaoCreateManyArgs>(args?: SelectSubset<T, ProposicaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proposicaos and returns the data saved in the database.
     * @param {ProposicaoCreateManyAndReturnArgs} args - Arguments to create many Proposicaos.
     * @example
     * // Create many Proposicaos
     * const proposicao = await prisma.proposicao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proposicaos and only return the `id`
     * const proposicaoWithIdOnly = await prisma.proposicao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProposicaoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProposicaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proposicao.
     * @param {ProposicaoDeleteArgs} args - Arguments to delete one Proposicao.
     * @example
     * // Delete one Proposicao
     * const Proposicao = await prisma.proposicao.delete({
     *   where: {
     *     // ... filter to delete one Proposicao
     *   }
     * })
     * 
     */
    delete<T extends ProposicaoDeleteArgs>(args: SelectSubset<T, ProposicaoDeleteArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proposicao.
     * @param {ProposicaoUpdateArgs} args - Arguments to update one Proposicao.
     * @example
     * // Update one Proposicao
     * const proposicao = await prisma.proposicao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProposicaoUpdateArgs>(args: SelectSubset<T, ProposicaoUpdateArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proposicaos.
     * @param {ProposicaoDeleteManyArgs} args - Arguments to filter Proposicaos to delete.
     * @example
     * // Delete a few Proposicaos
     * const { count } = await prisma.proposicao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProposicaoDeleteManyArgs>(args?: SelectSubset<T, ProposicaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proposicaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proposicaos
     * const proposicao = await prisma.proposicao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProposicaoUpdateManyArgs>(args: SelectSubset<T, ProposicaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proposicaos and returns the data updated in the database.
     * @param {ProposicaoUpdateManyAndReturnArgs} args - Arguments to update many Proposicaos.
     * @example
     * // Update many Proposicaos
     * const proposicao = await prisma.proposicao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proposicaos and only return the `id`
     * const proposicaoWithIdOnly = await prisma.proposicao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProposicaoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProposicaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proposicao.
     * @param {ProposicaoUpsertArgs} args - Arguments to update or create a Proposicao.
     * @example
     * // Update or create a Proposicao
     * const proposicao = await prisma.proposicao.upsert({
     *   create: {
     *     // ... data to create a Proposicao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proposicao we want to update
     *   }
     * })
     */
    upsert<T extends ProposicaoUpsertArgs>(args: SelectSubset<T, ProposicaoUpsertArgs<ExtArgs>>): Prisma__ProposicaoClient<$Result.GetResult<Prisma.$ProposicaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proposicaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoCountArgs} args - Arguments to filter Proposicaos to count.
     * @example
     * // Count the number of Proposicaos
     * const count = await prisma.proposicao.count({
     *   where: {
     *     // ... the filter for the Proposicaos we want to count
     *   }
     * })
    **/
    count<T extends ProposicaoCountArgs>(
      args?: Subset<T, ProposicaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProposicaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proposicao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProposicaoAggregateArgs>(args: Subset<T, ProposicaoAggregateArgs>): Prisma.PrismaPromise<GetProposicaoAggregateType<T>>

    /**
     * Group by Proposicao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposicaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProposicaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProposicaoGroupByArgs['orderBy'] }
        : { orderBy?: ProposicaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProposicaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProposicaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proposicao model
   */
  readonly fields: ProposicaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proposicao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProposicaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    autor<T extends Proposicao$autorArgs<ExtArgs> = {}>(args?: Subset<T, Proposicao$autorArgs<ExtArgs>>): Prisma__ParlamentarClient<$Result.GetResult<Prisma.$ParlamentarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    votacoes<T extends Proposicao$votacoesArgs<ExtArgs> = {}>(args?: Subset<T, Proposicao$votacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoteEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proposicao model
   */
  interface ProposicaoFieldRefs {
    readonly id: FieldRef<"Proposicao", 'String'>
    readonly externalId: FieldRef<"Proposicao", 'Int'>
    readonly tipo: FieldRef<"Proposicao", 'String'>
    readonly numero: FieldRef<"Proposicao", 'Int'>
    readonly ano: FieldRef<"Proposicao", 'Int'>
    readonly ementa: FieldRef<"Proposicao", 'String'>
    readonly dataApresentacao: FieldRef<"Proposicao", 'DateTime'>
    readonly urlInteiro: FieldRef<"Proposicao", 'String'>
    readonly camara: FieldRef<"Proposicao", 'String'>
    readonly autorId: FieldRef<"Proposicao", 'String'>
    readonly syncedAt: FieldRef<"Proposicao", 'DateTime'>
    readonly createdAt: FieldRef<"Proposicao", 'DateTime'>
    readonly updatedAt: FieldRef<"Proposicao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Proposicao findUnique
   */
  export type ProposicaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * Filter, which Proposicao to fetch.
     */
    where: ProposicaoWhereUniqueInput
  }

  /**
   * Proposicao findUniqueOrThrow
   */
  export type ProposicaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * Filter, which Proposicao to fetch.
     */
    where: ProposicaoWhereUniqueInput
  }

  /**
   * Proposicao findFirst
   */
  export type ProposicaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * Filter, which Proposicao to fetch.
     */
    where?: ProposicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposicaos to fetch.
     */
    orderBy?: ProposicaoOrderByWithRelationInput | ProposicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proposicaos.
     */
    cursor?: ProposicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposicaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proposicaos.
     */
    distinct?: ProposicaoScalarFieldEnum | ProposicaoScalarFieldEnum[]
  }

  /**
   * Proposicao findFirstOrThrow
   */
  export type ProposicaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * Filter, which Proposicao to fetch.
     */
    where?: ProposicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposicaos to fetch.
     */
    orderBy?: ProposicaoOrderByWithRelationInput | ProposicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proposicaos.
     */
    cursor?: ProposicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposicaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proposicaos.
     */
    distinct?: ProposicaoScalarFieldEnum | ProposicaoScalarFieldEnum[]
  }

  /**
   * Proposicao findMany
   */
  export type ProposicaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * Filter, which Proposicaos to fetch.
     */
    where?: ProposicaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposicaos to fetch.
     */
    orderBy?: ProposicaoOrderByWithRelationInput | ProposicaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proposicaos.
     */
    cursor?: ProposicaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposicaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposicaos.
     */
    skip?: number
    distinct?: ProposicaoScalarFieldEnum | ProposicaoScalarFieldEnum[]
  }

  /**
   * Proposicao create
   */
  export type ProposicaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Proposicao.
     */
    data: XOR<ProposicaoCreateInput, ProposicaoUncheckedCreateInput>
  }

  /**
   * Proposicao createMany
   */
  export type ProposicaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proposicaos.
     */
    data: ProposicaoCreateManyInput | ProposicaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proposicao createManyAndReturn
   */
  export type ProposicaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * The data used to create many Proposicaos.
     */
    data: ProposicaoCreateManyInput | ProposicaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proposicao update
   */
  export type ProposicaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Proposicao.
     */
    data: XOR<ProposicaoUpdateInput, ProposicaoUncheckedUpdateInput>
    /**
     * Choose, which Proposicao to update.
     */
    where: ProposicaoWhereUniqueInput
  }

  /**
   * Proposicao updateMany
   */
  export type ProposicaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proposicaos.
     */
    data: XOR<ProposicaoUpdateManyMutationInput, ProposicaoUncheckedUpdateManyInput>
    /**
     * Filter which Proposicaos to update
     */
    where?: ProposicaoWhereInput
    /**
     * Limit how many Proposicaos to update.
     */
    limit?: number
  }

  /**
   * Proposicao updateManyAndReturn
   */
  export type ProposicaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * The data used to update Proposicaos.
     */
    data: XOR<ProposicaoUpdateManyMutationInput, ProposicaoUncheckedUpdateManyInput>
    /**
     * Filter which Proposicaos to update
     */
    where?: ProposicaoWhereInput
    /**
     * Limit how many Proposicaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proposicao upsert
   */
  export type ProposicaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Proposicao to update in case it exists.
     */
    where: ProposicaoWhereUniqueInput
    /**
     * In case the Proposicao found by the `where` argument doesn't exist, create a new Proposicao with this data.
     */
    create: XOR<ProposicaoCreateInput, ProposicaoUncheckedCreateInput>
    /**
     * In case the Proposicao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProposicaoUpdateInput, ProposicaoUncheckedUpdateInput>
  }

  /**
   * Proposicao delete
   */
  export type ProposicaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
    /**
     * Filter which Proposicao to delete.
     */
    where: ProposicaoWhereUniqueInput
  }

  /**
   * Proposicao deleteMany
   */
  export type ProposicaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proposicaos to delete
     */
    where?: ProposicaoWhereInput
    /**
     * Limit how many Proposicaos to delete.
     */
    limit?: number
  }

  /**
   * Proposicao.autor
   */
  export type Proposicao$autorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parlamentar
     */
    select?: ParlamentarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parlamentar
     */
    omit?: ParlamentarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParlamentarInclude<ExtArgs> | null
    where?: ParlamentarWhereInput
  }

  /**
   * Proposicao.votacoes
   */
  export type Proposicao$votacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoteEvent
     */
    select?: VoteEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VoteEvent
     */
    omit?: VoteEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteEventInclude<ExtArgs> | null
    where?: VoteEventWhereInput
    orderBy?: VoteEventOrderByWithRelationInput | VoteEventOrderByWithRelationInput[]
    cursor?: VoteEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteEventScalarFieldEnum | VoteEventScalarFieldEnum[]
  }

  /**
   * Proposicao without action
   */
  export type ProposicaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposicao
     */
    select?: ProposicaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proposicao
     */
    omit?: ProposicaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposicaoInclude<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    itemCount: number | null
    duration: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    itemCount: number | null
    duration: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: string | null
    source: string | null
    entity: string | null
    status: string | null
    itemCount: number | null
    error: string | null
    startedAt: Date | null
    completedAt: Date | null
    duration: number | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: string | null
    source: string | null
    entity: string | null
    status: string | null
    itemCount: number | null
    error: string | null
    startedAt: Date | null
    completedAt: Date | null
    duration: number | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    source: number
    entity: number
    status: number
    itemCount: number
    error: number
    startedAt: number
    completedAt: number
    duration: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    itemCount?: true
    duration?: true
  }

  export type SyncLogSumAggregateInputType = {
    itemCount?: true
    duration?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    source?: true
    entity?: true
    status?: true
    itemCount?: true
    error?: true
    startedAt?: true
    completedAt?: true
    duration?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    source?: true
    entity?: true
    status?: true
    itemCount?: true
    error?: true
    startedAt?: true
    completedAt?: true
    duration?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    source?: true
    entity?: true
    status?: true
    itemCount?: true
    error?: true
    startedAt?: true
    completedAt?: true
    duration?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: string
    source: string
    entity: string
    status: string
    itemCount: number | null
    error: string | null
    startedAt: Date
    completedAt: Date | null
    duration: number | null
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    entity?: boolean
    status?: boolean
    itemCount?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    duration?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    entity?: boolean
    status?: boolean
    itemCount?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    duration?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    entity?: boolean
    status?: boolean
    itemCount?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    duration?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    source?: boolean
    entity?: boolean
    status?: boolean
    itemCount?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    duration?: boolean
  }

  export type SyncLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source" | "entity" | "status" | "itemCount" | "error" | "startedAt" | "completedAt" | "duration", ExtArgs["result"]["syncLog"]>

  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      source: string
      entity: string
      status: string
      itemCount: number | null
      error: string | null
      startedAt: Date
      completedAt: Date | null
      duration: number | null
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs and returns the data updated in the database.
     * @param {SyncLogUpdateManyAndReturnArgs} args - Arguments to update many SyncLogs.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'String'>
    readonly source: FieldRef<"SyncLog", 'String'>
    readonly entity: FieldRef<"SyncLog", 'String'>
    readonly status: FieldRef<"SyncLog", 'String'>
    readonly itemCount: FieldRef<"SyncLog", 'Int'>
    readonly error: FieldRef<"SyncLog", 'String'>
    readonly startedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly completedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly duration: FieldRef<"SyncLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog updateManyAndReturn
   */
  export type SyncLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to delete.
     */
    limit?: number
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ParlamentarScalarFieldEnum: {
    id: 'id',
    idOriginal: 'idOriginal',
    camara: 'camara',
    nome: 'nome',
    nomeCompleto: 'nomeCompleto',
    partido: 'partido',
    uf: 'uf',
    foto: 'foto',
    slug: 'slug',
    email: 'email',
    legislatura: 'legislatura',
    syncedAt: 'syncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParlamentarScalarFieldEnum = (typeof ParlamentarScalarFieldEnum)[keyof typeof ParlamentarScalarFieldEnum]


  export const VoteEventScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    data: 'data',
    descricao: 'descricao',
    resultado: 'resultado',
    camara: 'camara',
    proposicaoId: 'proposicaoId',
    syncedAt: 'syncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VoteEventScalarFieldEnum = (typeof VoteEventScalarFieldEnum)[keyof typeof VoteEventScalarFieldEnum]


  export const VoteRecordScalarFieldEnum: {
    id: 'id',
    voto: 'voto',
    parlamentarId: 'parlamentarId',
    votacaoId: 'votacaoId',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type VoteRecordScalarFieldEnum = (typeof VoteRecordScalarFieldEnum)[keyof typeof VoteRecordScalarFieldEnum]


  export const ProposicaoScalarFieldEnum: {
    id: 'id',
    externalId: 'externalId',
    tipo: 'tipo',
    numero: 'numero',
    ano: 'ano',
    ementa: 'ementa',
    dataApresentacao: 'dataApresentacao',
    urlInteiro: 'urlInteiro',
    camara: 'camara',
    autorId: 'autorId',
    syncedAt: 'syncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProposicaoScalarFieldEnum = (typeof ProposicaoScalarFieldEnum)[keyof typeof ProposicaoScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    source: 'source',
    entity: 'entity',
    status: 'status',
    itemCount: 'itemCount',
    error: 'error',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    duration: 'duration'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ParlamentarWhereInput = {
    AND?: ParlamentarWhereInput | ParlamentarWhereInput[]
    OR?: ParlamentarWhereInput[]
    NOT?: ParlamentarWhereInput | ParlamentarWhereInput[]
    id?: StringFilter<"Parlamentar"> | string
    idOriginal?: IntFilter<"Parlamentar"> | number
    camara?: StringFilter<"Parlamentar"> | string
    nome?: StringFilter<"Parlamentar"> | string
    nomeCompleto?: StringFilter<"Parlamentar"> | string
    partido?: StringFilter<"Parlamentar"> | string
    uf?: StringFilter<"Parlamentar"> | string
    foto?: StringFilter<"Parlamentar"> | string
    slug?: StringFilter<"Parlamentar"> | string
    email?: StringNullableFilter<"Parlamentar"> | string | null
    legislatura?: IntFilter<"Parlamentar"> | number
    syncedAt?: DateTimeFilter<"Parlamentar"> | Date | string
    createdAt?: DateTimeFilter<"Parlamentar"> | Date | string
    updatedAt?: DateTimeFilter<"Parlamentar"> | Date | string
    votos?: VoteRecordListRelationFilter
    proposicoes?: ProposicaoListRelationFilter
  }

  export type ParlamentarOrderByWithRelationInput = {
    id?: SortOrder
    idOriginal?: SortOrder
    camara?: SortOrder
    nome?: SortOrder
    nomeCompleto?: SortOrder
    partido?: SortOrder
    uf?: SortOrder
    foto?: SortOrder
    slug?: SortOrder
    email?: SortOrderInput | SortOrder
    legislatura?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    votos?: VoteRecordOrderByRelationAggregateInput
    proposicoes?: ProposicaoOrderByRelationAggregateInput
  }

  export type ParlamentarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParlamentarWhereInput | ParlamentarWhereInput[]
    OR?: ParlamentarWhereInput[]
    NOT?: ParlamentarWhereInput | ParlamentarWhereInput[]
    idOriginal?: IntFilter<"Parlamentar"> | number
    camara?: StringFilter<"Parlamentar"> | string
    nome?: StringFilter<"Parlamentar"> | string
    nomeCompleto?: StringFilter<"Parlamentar"> | string
    partido?: StringFilter<"Parlamentar"> | string
    uf?: StringFilter<"Parlamentar"> | string
    foto?: StringFilter<"Parlamentar"> | string
    slug?: StringFilter<"Parlamentar"> | string
    email?: StringNullableFilter<"Parlamentar"> | string | null
    legislatura?: IntFilter<"Parlamentar"> | number
    syncedAt?: DateTimeFilter<"Parlamentar"> | Date | string
    createdAt?: DateTimeFilter<"Parlamentar"> | Date | string
    updatedAt?: DateTimeFilter<"Parlamentar"> | Date | string
    votos?: VoteRecordListRelationFilter
    proposicoes?: ProposicaoListRelationFilter
  }, "id">

  export type ParlamentarOrderByWithAggregationInput = {
    id?: SortOrder
    idOriginal?: SortOrder
    camara?: SortOrder
    nome?: SortOrder
    nomeCompleto?: SortOrder
    partido?: SortOrder
    uf?: SortOrder
    foto?: SortOrder
    slug?: SortOrder
    email?: SortOrderInput | SortOrder
    legislatura?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParlamentarCountOrderByAggregateInput
    _avg?: ParlamentarAvgOrderByAggregateInput
    _max?: ParlamentarMaxOrderByAggregateInput
    _min?: ParlamentarMinOrderByAggregateInput
    _sum?: ParlamentarSumOrderByAggregateInput
  }

  export type ParlamentarScalarWhereWithAggregatesInput = {
    AND?: ParlamentarScalarWhereWithAggregatesInput | ParlamentarScalarWhereWithAggregatesInput[]
    OR?: ParlamentarScalarWhereWithAggregatesInput[]
    NOT?: ParlamentarScalarWhereWithAggregatesInput | ParlamentarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Parlamentar"> | string
    idOriginal?: IntWithAggregatesFilter<"Parlamentar"> | number
    camara?: StringWithAggregatesFilter<"Parlamentar"> | string
    nome?: StringWithAggregatesFilter<"Parlamentar"> | string
    nomeCompleto?: StringWithAggregatesFilter<"Parlamentar"> | string
    partido?: StringWithAggregatesFilter<"Parlamentar"> | string
    uf?: StringWithAggregatesFilter<"Parlamentar"> | string
    foto?: StringWithAggregatesFilter<"Parlamentar"> | string
    slug?: StringWithAggregatesFilter<"Parlamentar"> | string
    email?: StringNullableWithAggregatesFilter<"Parlamentar"> | string | null
    legislatura?: IntWithAggregatesFilter<"Parlamentar"> | number
    syncedAt?: DateTimeWithAggregatesFilter<"Parlamentar"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Parlamentar"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Parlamentar"> | Date | string
  }

  export type VoteEventWhereInput = {
    AND?: VoteEventWhereInput | VoteEventWhereInput[]
    OR?: VoteEventWhereInput[]
    NOT?: VoteEventWhereInput | VoteEventWhereInput[]
    id?: StringFilter<"VoteEvent"> | string
    externalId?: StringFilter<"VoteEvent"> | string
    data?: DateTimeFilter<"VoteEvent"> | Date | string
    descricao?: StringFilter<"VoteEvent"> | string
    resultado?: StringNullableFilter<"VoteEvent"> | string | null
    camara?: StringFilter<"VoteEvent"> | string
    proposicaoId?: StringNullableFilter<"VoteEvent"> | string | null
    syncedAt?: DateTimeFilter<"VoteEvent"> | Date | string
    createdAt?: DateTimeFilter<"VoteEvent"> | Date | string
    updatedAt?: DateTimeFilter<"VoteEvent"> | Date | string
    proposicao?: XOR<ProposicaoNullableScalarRelationFilter, ProposicaoWhereInput> | null
    votos?: VoteRecordListRelationFilter
  }

  export type VoteEventOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    data?: SortOrder
    descricao?: SortOrder
    resultado?: SortOrderInput | SortOrder
    camara?: SortOrder
    proposicaoId?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    proposicao?: ProposicaoOrderByWithRelationInput
    votos?: VoteRecordOrderByRelationAggregateInput
  }

  export type VoteEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: string
    AND?: VoteEventWhereInput | VoteEventWhereInput[]
    OR?: VoteEventWhereInput[]
    NOT?: VoteEventWhereInput | VoteEventWhereInput[]
    data?: DateTimeFilter<"VoteEvent"> | Date | string
    descricao?: StringFilter<"VoteEvent"> | string
    resultado?: StringNullableFilter<"VoteEvent"> | string | null
    camara?: StringFilter<"VoteEvent"> | string
    proposicaoId?: StringNullableFilter<"VoteEvent"> | string | null
    syncedAt?: DateTimeFilter<"VoteEvent"> | Date | string
    createdAt?: DateTimeFilter<"VoteEvent"> | Date | string
    updatedAt?: DateTimeFilter<"VoteEvent"> | Date | string
    proposicao?: XOR<ProposicaoNullableScalarRelationFilter, ProposicaoWhereInput> | null
    votos?: VoteRecordListRelationFilter
  }, "id" | "externalId">

  export type VoteEventOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    data?: SortOrder
    descricao?: SortOrder
    resultado?: SortOrderInput | SortOrder
    camara?: SortOrder
    proposicaoId?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VoteEventCountOrderByAggregateInput
    _max?: VoteEventMaxOrderByAggregateInput
    _min?: VoteEventMinOrderByAggregateInput
  }

  export type VoteEventScalarWhereWithAggregatesInput = {
    AND?: VoteEventScalarWhereWithAggregatesInput | VoteEventScalarWhereWithAggregatesInput[]
    OR?: VoteEventScalarWhereWithAggregatesInput[]
    NOT?: VoteEventScalarWhereWithAggregatesInput | VoteEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VoteEvent"> | string
    externalId?: StringWithAggregatesFilter<"VoteEvent"> | string
    data?: DateTimeWithAggregatesFilter<"VoteEvent"> | Date | string
    descricao?: StringWithAggregatesFilter<"VoteEvent"> | string
    resultado?: StringNullableWithAggregatesFilter<"VoteEvent"> | string | null
    camara?: StringWithAggregatesFilter<"VoteEvent"> | string
    proposicaoId?: StringNullableWithAggregatesFilter<"VoteEvent"> | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"VoteEvent"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VoteEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VoteEvent"> | Date | string
  }

  export type VoteRecordWhereInput = {
    AND?: VoteRecordWhereInput | VoteRecordWhereInput[]
    OR?: VoteRecordWhereInput[]
    NOT?: VoteRecordWhereInput | VoteRecordWhereInput[]
    id?: StringFilter<"VoteRecord"> | string
    voto?: StringFilter<"VoteRecord"> | string
    parlamentarId?: StringFilter<"VoteRecord"> | string
    votacaoId?: StringFilter<"VoteRecord"> | string
    data?: DateTimeFilter<"VoteRecord"> | Date | string
    createdAt?: DateTimeFilter<"VoteRecord"> | Date | string
    parlamentar?: XOR<ParlamentarScalarRelationFilter, ParlamentarWhereInput>
    votacao?: XOR<VoteEventScalarRelationFilter, VoteEventWhereInput>
  }

  export type VoteRecordOrderByWithRelationInput = {
    id?: SortOrder
    voto?: SortOrder
    parlamentarId?: SortOrder
    votacaoId?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    parlamentar?: ParlamentarOrderByWithRelationInput
    votacao?: VoteEventOrderByWithRelationInput
  }

  export type VoteRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    parlamentarId_votacaoId?: VoteRecordParlamentarIdVotacaoIdCompoundUniqueInput
    AND?: VoteRecordWhereInput | VoteRecordWhereInput[]
    OR?: VoteRecordWhereInput[]
    NOT?: VoteRecordWhereInput | VoteRecordWhereInput[]
    voto?: StringFilter<"VoteRecord"> | string
    parlamentarId?: StringFilter<"VoteRecord"> | string
    votacaoId?: StringFilter<"VoteRecord"> | string
    data?: DateTimeFilter<"VoteRecord"> | Date | string
    createdAt?: DateTimeFilter<"VoteRecord"> | Date | string
    parlamentar?: XOR<ParlamentarScalarRelationFilter, ParlamentarWhereInput>
    votacao?: XOR<VoteEventScalarRelationFilter, VoteEventWhereInput>
  }, "id" | "parlamentarId_votacaoId">

  export type VoteRecordOrderByWithAggregationInput = {
    id?: SortOrder
    voto?: SortOrder
    parlamentarId?: SortOrder
    votacaoId?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    _count?: VoteRecordCountOrderByAggregateInput
    _max?: VoteRecordMaxOrderByAggregateInput
    _min?: VoteRecordMinOrderByAggregateInput
  }

  export type VoteRecordScalarWhereWithAggregatesInput = {
    AND?: VoteRecordScalarWhereWithAggregatesInput | VoteRecordScalarWhereWithAggregatesInput[]
    OR?: VoteRecordScalarWhereWithAggregatesInput[]
    NOT?: VoteRecordScalarWhereWithAggregatesInput | VoteRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VoteRecord"> | string
    voto?: StringWithAggregatesFilter<"VoteRecord"> | string
    parlamentarId?: StringWithAggregatesFilter<"VoteRecord"> | string
    votacaoId?: StringWithAggregatesFilter<"VoteRecord"> | string
    data?: DateTimeWithAggregatesFilter<"VoteRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VoteRecord"> | Date | string
  }

  export type ProposicaoWhereInput = {
    AND?: ProposicaoWhereInput | ProposicaoWhereInput[]
    OR?: ProposicaoWhereInput[]
    NOT?: ProposicaoWhereInput | ProposicaoWhereInput[]
    id?: StringFilter<"Proposicao"> | string
    externalId?: IntFilter<"Proposicao"> | number
    tipo?: StringFilter<"Proposicao"> | string
    numero?: IntFilter<"Proposicao"> | number
    ano?: IntFilter<"Proposicao"> | number
    ementa?: StringFilter<"Proposicao"> | string
    dataApresentacao?: DateTimeFilter<"Proposicao"> | Date | string
    urlInteiro?: StringNullableFilter<"Proposicao"> | string | null
    camara?: StringFilter<"Proposicao"> | string
    autorId?: StringNullableFilter<"Proposicao"> | string | null
    syncedAt?: DateTimeFilter<"Proposicao"> | Date | string
    createdAt?: DateTimeFilter<"Proposicao"> | Date | string
    updatedAt?: DateTimeFilter<"Proposicao"> | Date | string
    autor?: XOR<ParlamentarNullableScalarRelationFilter, ParlamentarWhereInput> | null
    votacoes?: VoteEventListRelationFilter
  }

  export type ProposicaoOrderByWithRelationInput = {
    id?: SortOrder
    externalId?: SortOrder
    tipo?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
    ementa?: SortOrder
    dataApresentacao?: SortOrder
    urlInteiro?: SortOrderInput | SortOrder
    camara?: SortOrder
    autorId?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    autor?: ParlamentarOrderByWithRelationInput
    votacoes?: VoteEventOrderByRelationAggregateInput
  }

  export type ProposicaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: number
    AND?: ProposicaoWhereInput | ProposicaoWhereInput[]
    OR?: ProposicaoWhereInput[]
    NOT?: ProposicaoWhereInput | ProposicaoWhereInput[]
    tipo?: StringFilter<"Proposicao"> | string
    numero?: IntFilter<"Proposicao"> | number
    ano?: IntFilter<"Proposicao"> | number
    ementa?: StringFilter<"Proposicao"> | string
    dataApresentacao?: DateTimeFilter<"Proposicao"> | Date | string
    urlInteiro?: StringNullableFilter<"Proposicao"> | string | null
    camara?: StringFilter<"Proposicao"> | string
    autorId?: StringNullableFilter<"Proposicao"> | string | null
    syncedAt?: DateTimeFilter<"Proposicao"> | Date | string
    createdAt?: DateTimeFilter<"Proposicao"> | Date | string
    updatedAt?: DateTimeFilter<"Proposicao"> | Date | string
    autor?: XOR<ParlamentarNullableScalarRelationFilter, ParlamentarWhereInput> | null
    votacoes?: VoteEventListRelationFilter
  }, "id" | "externalId">

  export type ProposicaoOrderByWithAggregationInput = {
    id?: SortOrder
    externalId?: SortOrder
    tipo?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
    ementa?: SortOrder
    dataApresentacao?: SortOrder
    urlInteiro?: SortOrderInput | SortOrder
    camara?: SortOrder
    autorId?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProposicaoCountOrderByAggregateInput
    _avg?: ProposicaoAvgOrderByAggregateInput
    _max?: ProposicaoMaxOrderByAggregateInput
    _min?: ProposicaoMinOrderByAggregateInput
    _sum?: ProposicaoSumOrderByAggregateInput
  }

  export type ProposicaoScalarWhereWithAggregatesInput = {
    AND?: ProposicaoScalarWhereWithAggregatesInput | ProposicaoScalarWhereWithAggregatesInput[]
    OR?: ProposicaoScalarWhereWithAggregatesInput[]
    NOT?: ProposicaoScalarWhereWithAggregatesInput | ProposicaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Proposicao"> | string
    externalId?: IntWithAggregatesFilter<"Proposicao"> | number
    tipo?: StringWithAggregatesFilter<"Proposicao"> | string
    numero?: IntWithAggregatesFilter<"Proposicao"> | number
    ano?: IntWithAggregatesFilter<"Proposicao"> | number
    ementa?: StringWithAggregatesFilter<"Proposicao"> | string
    dataApresentacao?: DateTimeWithAggregatesFilter<"Proposicao"> | Date | string
    urlInteiro?: StringNullableWithAggregatesFilter<"Proposicao"> | string | null
    camara?: StringWithAggregatesFilter<"Proposicao"> | string
    autorId?: StringNullableWithAggregatesFilter<"Proposicao"> | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"Proposicao"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Proposicao"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Proposicao"> | Date | string
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: StringFilter<"SyncLog"> | string
    source?: StringFilter<"SyncLog"> | string
    entity?: StringFilter<"SyncLog"> | string
    status?: StringFilter<"SyncLog"> | string
    itemCount?: IntNullableFilter<"SyncLog"> | number | null
    error?: StringNullableFilter<"SyncLog"> | string | null
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    duration?: IntNullableFilter<"SyncLog"> | number | null
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    entity?: SortOrder
    status?: SortOrder
    itemCount?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    source?: StringFilter<"SyncLog"> | string
    entity?: StringFilter<"SyncLog"> | string
    status?: StringFilter<"SyncLog"> | string
    itemCount?: IntNullableFilter<"SyncLog"> | number | null
    error?: StringNullableFilter<"SyncLog"> | string | null
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    duration?: IntNullableFilter<"SyncLog"> | number | null
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    entity?: SortOrder
    status?: SortOrder
    itemCount?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncLog"> | string
    source?: StringWithAggregatesFilter<"SyncLog"> | string
    entity?: StringWithAggregatesFilter<"SyncLog"> | string
    status?: StringWithAggregatesFilter<"SyncLog"> | string
    itemCount?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
    error?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"SyncLog"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
  }

  export type ParlamentarCreateInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordCreateNestedManyWithoutParlamentarInput
    proposicoes?: ProposicaoCreateNestedManyWithoutAutorInput
  }

  export type ParlamentarUncheckedCreateInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordUncheckedCreateNestedManyWithoutParlamentarInput
    proposicoes?: ProposicaoUncheckedCreateNestedManyWithoutAutorInput
  }

  export type ParlamentarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUpdateManyWithoutParlamentarNestedInput
    proposicoes?: ProposicaoUpdateManyWithoutAutorNestedInput
  }

  export type ParlamentarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUncheckedUpdateManyWithoutParlamentarNestedInput
    proposicoes?: ProposicaoUncheckedUpdateManyWithoutAutorNestedInput
  }

  export type ParlamentarCreateManyInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParlamentarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParlamentarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteEventCreateInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    proposicao?: ProposicaoCreateNestedOneWithoutVotacoesInput
    votos?: VoteRecordCreateNestedManyWithoutVotacaoInput
  }

  export type VoteEventUncheckedCreateInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    proposicaoId?: string | null
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordUncheckedCreateNestedManyWithoutVotacaoInput
  }

  export type VoteEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposicao?: ProposicaoUpdateOneWithoutVotacoesNestedInput
    votos?: VoteRecordUpdateManyWithoutVotacaoNestedInput
  }

  export type VoteEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    proposicaoId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUncheckedUpdateManyWithoutVotacaoNestedInput
  }

  export type VoteEventCreateManyInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    proposicaoId?: string | null
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoteEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    proposicaoId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordCreateInput = {
    id?: string
    voto: string
    data: Date | string
    createdAt?: Date | string
    parlamentar: ParlamentarCreateNestedOneWithoutVotosInput
    votacao: VoteEventCreateNestedOneWithoutVotosInput
  }

  export type VoteRecordUncheckedCreateInput = {
    id?: string
    voto: string
    parlamentarId: string
    votacaoId: string
    data: Date | string
    createdAt?: Date | string
  }

  export type VoteRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parlamentar?: ParlamentarUpdateOneRequiredWithoutVotosNestedInput
    votacao?: VoteEventUpdateOneRequiredWithoutVotosNestedInput
  }

  export type VoteRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    parlamentarId?: StringFieldUpdateOperationsInput | string
    votacaoId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordCreateManyInput = {
    id?: string
    voto: string
    parlamentarId: string
    votacaoId: string
    data: Date | string
    createdAt?: Date | string
  }

  export type VoteRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    parlamentarId?: StringFieldUpdateOperationsInput | string
    votacaoId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposicaoCreateInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    autor?: ParlamentarCreateNestedOneWithoutProposicoesInput
    votacoes?: VoteEventCreateNestedManyWithoutProposicaoInput
  }

  export type ProposicaoUncheckedCreateInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    autorId?: string | null
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votacoes?: VoteEventUncheckedCreateNestedManyWithoutProposicaoInput
  }

  export type ProposicaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autor?: ParlamentarUpdateOneWithoutProposicoesNestedInput
    votacoes?: VoteEventUpdateManyWithoutProposicaoNestedInput
  }

  export type ProposicaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    autorId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votacoes?: VoteEventUncheckedUpdateManyWithoutProposicaoNestedInput
  }

  export type ProposicaoCreateManyInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    autorId?: string | null
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProposicaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposicaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    autorId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateInput = {
    id?: string
    source: string
    entity: string
    status: string
    itemCount?: number | null
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    duration?: number | null
  }

  export type SyncLogUncheckedCreateInput = {
    id?: string
    source: string
    entity: string
    status: string
    itemCount?: number | null
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    duration?: number | null
  }

  export type SyncLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    itemCount?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    itemCount?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SyncLogCreateManyInput = {
    id?: string
    source: string
    entity: string
    status: string
    itemCount?: number | null
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    duration?: number | null
  }

  export type SyncLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    itemCount?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    itemCount?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VoteRecordListRelationFilter = {
    every?: VoteRecordWhereInput
    some?: VoteRecordWhereInput
    none?: VoteRecordWhereInput
  }

  export type ProposicaoListRelationFilter = {
    every?: ProposicaoWhereInput
    some?: ProposicaoWhereInput
    none?: ProposicaoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VoteRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProposicaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParlamentarCountOrderByAggregateInput = {
    id?: SortOrder
    idOriginal?: SortOrder
    camara?: SortOrder
    nome?: SortOrder
    nomeCompleto?: SortOrder
    partido?: SortOrder
    uf?: SortOrder
    foto?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    legislatura?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParlamentarAvgOrderByAggregateInput = {
    idOriginal?: SortOrder
    legislatura?: SortOrder
  }

  export type ParlamentarMaxOrderByAggregateInput = {
    id?: SortOrder
    idOriginal?: SortOrder
    camara?: SortOrder
    nome?: SortOrder
    nomeCompleto?: SortOrder
    partido?: SortOrder
    uf?: SortOrder
    foto?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    legislatura?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParlamentarMinOrderByAggregateInput = {
    id?: SortOrder
    idOriginal?: SortOrder
    camara?: SortOrder
    nome?: SortOrder
    nomeCompleto?: SortOrder
    partido?: SortOrder
    uf?: SortOrder
    foto?: SortOrder
    slug?: SortOrder
    email?: SortOrder
    legislatura?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParlamentarSumOrderByAggregateInput = {
    idOriginal?: SortOrder
    legislatura?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProposicaoNullableScalarRelationFilter = {
    is?: ProposicaoWhereInput | null
    isNot?: ProposicaoWhereInput | null
  }

  export type VoteEventCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    data?: SortOrder
    descricao?: SortOrder
    resultado?: SortOrder
    camara?: SortOrder
    proposicaoId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoteEventMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    data?: SortOrder
    descricao?: SortOrder
    resultado?: SortOrder
    camara?: SortOrder
    proposicaoId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoteEventMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    data?: SortOrder
    descricao?: SortOrder
    resultado?: SortOrder
    camara?: SortOrder
    proposicaoId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParlamentarScalarRelationFilter = {
    is?: ParlamentarWhereInput
    isNot?: ParlamentarWhereInput
  }

  export type VoteEventScalarRelationFilter = {
    is?: VoteEventWhereInput
    isNot?: VoteEventWhereInput
  }

  export type VoteRecordParlamentarIdVotacaoIdCompoundUniqueInput = {
    parlamentarId: string
    votacaoId: string
  }

  export type VoteRecordCountOrderByAggregateInput = {
    id?: SortOrder
    voto?: SortOrder
    parlamentarId?: SortOrder
    votacaoId?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type VoteRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    voto?: SortOrder
    parlamentarId?: SortOrder
    votacaoId?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type VoteRecordMinOrderByAggregateInput = {
    id?: SortOrder
    voto?: SortOrder
    parlamentarId?: SortOrder
    votacaoId?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type ParlamentarNullableScalarRelationFilter = {
    is?: ParlamentarWhereInput | null
    isNot?: ParlamentarWhereInput | null
  }

  export type VoteEventListRelationFilter = {
    every?: VoteEventWhereInput
    some?: VoteEventWhereInput
    none?: VoteEventWhereInput
  }

  export type VoteEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProposicaoCountOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    tipo?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
    ementa?: SortOrder
    dataApresentacao?: SortOrder
    urlInteiro?: SortOrder
    camara?: SortOrder
    autorId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProposicaoAvgOrderByAggregateInput = {
    externalId?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
  }

  export type ProposicaoMaxOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    tipo?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
    ementa?: SortOrder
    dataApresentacao?: SortOrder
    urlInteiro?: SortOrder
    camara?: SortOrder
    autorId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProposicaoMinOrderByAggregateInput = {
    id?: SortOrder
    externalId?: SortOrder
    tipo?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
    ementa?: SortOrder
    dataApresentacao?: SortOrder
    urlInteiro?: SortOrder
    camara?: SortOrder
    autorId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProposicaoSumOrderByAggregateInput = {
    externalId?: SortOrder
    numero?: SortOrder
    ano?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    entity?: SortOrder
    status?: SortOrder
    itemCount?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    duration?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    itemCount?: SortOrder
    duration?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    entity?: SortOrder
    status?: SortOrder
    itemCount?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    duration?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    entity?: SortOrder
    status?: SortOrder
    itemCount?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    duration?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    itemCount?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VoteRecordCreateNestedManyWithoutParlamentarInput = {
    create?: XOR<VoteRecordCreateWithoutParlamentarInput, VoteRecordUncheckedCreateWithoutParlamentarInput> | VoteRecordCreateWithoutParlamentarInput[] | VoteRecordUncheckedCreateWithoutParlamentarInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutParlamentarInput | VoteRecordCreateOrConnectWithoutParlamentarInput[]
    createMany?: VoteRecordCreateManyParlamentarInputEnvelope
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
  }

  export type ProposicaoCreateNestedManyWithoutAutorInput = {
    create?: XOR<ProposicaoCreateWithoutAutorInput, ProposicaoUncheckedCreateWithoutAutorInput> | ProposicaoCreateWithoutAutorInput[] | ProposicaoUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ProposicaoCreateOrConnectWithoutAutorInput | ProposicaoCreateOrConnectWithoutAutorInput[]
    createMany?: ProposicaoCreateManyAutorInputEnvelope
    connect?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
  }

  export type VoteRecordUncheckedCreateNestedManyWithoutParlamentarInput = {
    create?: XOR<VoteRecordCreateWithoutParlamentarInput, VoteRecordUncheckedCreateWithoutParlamentarInput> | VoteRecordCreateWithoutParlamentarInput[] | VoteRecordUncheckedCreateWithoutParlamentarInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutParlamentarInput | VoteRecordCreateOrConnectWithoutParlamentarInput[]
    createMany?: VoteRecordCreateManyParlamentarInputEnvelope
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
  }

  export type ProposicaoUncheckedCreateNestedManyWithoutAutorInput = {
    create?: XOR<ProposicaoCreateWithoutAutorInput, ProposicaoUncheckedCreateWithoutAutorInput> | ProposicaoCreateWithoutAutorInput[] | ProposicaoUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ProposicaoCreateOrConnectWithoutAutorInput | ProposicaoCreateOrConnectWithoutAutorInput[]
    createMany?: ProposicaoCreateManyAutorInputEnvelope
    connect?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VoteRecordUpdateManyWithoutParlamentarNestedInput = {
    create?: XOR<VoteRecordCreateWithoutParlamentarInput, VoteRecordUncheckedCreateWithoutParlamentarInput> | VoteRecordCreateWithoutParlamentarInput[] | VoteRecordUncheckedCreateWithoutParlamentarInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutParlamentarInput | VoteRecordCreateOrConnectWithoutParlamentarInput[]
    upsert?: VoteRecordUpsertWithWhereUniqueWithoutParlamentarInput | VoteRecordUpsertWithWhereUniqueWithoutParlamentarInput[]
    createMany?: VoteRecordCreateManyParlamentarInputEnvelope
    set?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    disconnect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    delete?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    update?: VoteRecordUpdateWithWhereUniqueWithoutParlamentarInput | VoteRecordUpdateWithWhereUniqueWithoutParlamentarInput[]
    updateMany?: VoteRecordUpdateManyWithWhereWithoutParlamentarInput | VoteRecordUpdateManyWithWhereWithoutParlamentarInput[]
    deleteMany?: VoteRecordScalarWhereInput | VoteRecordScalarWhereInput[]
  }

  export type ProposicaoUpdateManyWithoutAutorNestedInput = {
    create?: XOR<ProposicaoCreateWithoutAutorInput, ProposicaoUncheckedCreateWithoutAutorInput> | ProposicaoCreateWithoutAutorInput[] | ProposicaoUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ProposicaoCreateOrConnectWithoutAutorInput | ProposicaoCreateOrConnectWithoutAutorInput[]
    upsert?: ProposicaoUpsertWithWhereUniqueWithoutAutorInput | ProposicaoUpsertWithWhereUniqueWithoutAutorInput[]
    createMany?: ProposicaoCreateManyAutorInputEnvelope
    set?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    disconnect?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    delete?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    connect?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    update?: ProposicaoUpdateWithWhereUniqueWithoutAutorInput | ProposicaoUpdateWithWhereUniqueWithoutAutorInput[]
    updateMany?: ProposicaoUpdateManyWithWhereWithoutAutorInput | ProposicaoUpdateManyWithWhereWithoutAutorInput[]
    deleteMany?: ProposicaoScalarWhereInput | ProposicaoScalarWhereInput[]
  }

  export type VoteRecordUncheckedUpdateManyWithoutParlamentarNestedInput = {
    create?: XOR<VoteRecordCreateWithoutParlamentarInput, VoteRecordUncheckedCreateWithoutParlamentarInput> | VoteRecordCreateWithoutParlamentarInput[] | VoteRecordUncheckedCreateWithoutParlamentarInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutParlamentarInput | VoteRecordCreateOrConnectWithoutParlamentarInput[]
    upsert?: VoteRecordUpsertWithWhereUniqueWithoutParlamentarInput | VoteRecordUpsertWithWhereUniqueWithoutParlamentarInput[]
    createMany?: VoteRecordCreateManyParlamentarInputEnvelope
    set?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    disconnect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    delete?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    update?: VoteRecordUpdateWithWhereUniqueWithoutParlamentarInput | VoteRecordUpdateWithWhereUniqueWithoutParlamentarInput[]
    updateMany?: VoteRecordUpdateManyWithWhereWithoutParlamentarInput | VoteRecordUpdateManyWithWhereWithoutParlamentarInput[]
    deleteMany?: VoteRecordScalarWhereInput | VoteRecordScalarWhereInput[]
  }

  export type ProposicaoUncheckedUpdateManyWithoutAutorNestedInput = {
    create?: XOR<ProposicaoCreateWithoutAutorInput, ProposicaoUncheckedCreateWithoutAutorInput> | ProposicaoCreateWithoutAutorInput[] | ProposicaoUncheckedCreateWithoutAutorInput[]
    connectOrCreate?: ProposicaoCreateOrConnectWithoutAutorInput | ProposicaoCreateOrConnectWithoutAutorInput[]
    upsert?: ProposicaoUpsertWithWhereUniqueWithoutAutorInput | ProposicaoUpsertWithWhereUniqueWithoutAutorInput[]
    createMany?: ProposicaoCreateManyAutorInputEnvelope
    set?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    disconnect?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    delete?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    connect?: ProposicaoWhereUniqueInput | ProposicaoWhereUniqueInput[]
    update?: ProposicaoUpdateWithWhereUniqueWithoutAutorInput | ProposicaoUpdateWithWhereUniqueWithoutAutorInput[]
    updateMany?: ProposicaoUpdateManyWithWhereWithoutAutorInput | ProposicaoUpdateManyWithWhereWithoutAutorInput[]
    deleteMany?: ProposicaoScalarWhereInput | ProposicaoScalarWhereInput[]
  }

  export type ProposicaoCreateNestedOneWithoutVotacoesInput = {
    create?: XOR<ProposicaoCreateWithoutVotacoesInput, ProposicaoUncheckedCreateWithoutVotacoesInput>
    connectOrCreate?: ProposicaoCreateOrConnectWithoutVotacoesInput
    connect?: ProposicaoWhereUniqueInput
  }

  export type VoteRecordCreateNestedManyWithoutVotacaoInput = {
    create?: XOR<VoteRecordCreateWithoutVotacaoInput, VoteRecordUncheckedCreateWithoutVotacaoInput> | VoteRecordCreateWithoutVotacaoInput[] | VoteRecordUncheckedCreateWithoutVotacaoInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutVotacaoInput | VoteRecordCreateOrConnectWithoutVotacaoInput[]
    createMany?: VoteRecordCreateManyVotacaoInputEnvelope
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
  }

  export type VoteRecordUncheckedCreateNestedManyWithoutVotacaoInput = {
    create?: XOR<VoteRecordCreateWithoutVotacaoInput, VoteRecordUncheckedCreateWithoutVotacaoInput> | VoteRecordCreateWithoutVotacaoInput[] | VoteRecordUncheckedCreateWithoutVotacaoInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutVotacaoInput | VoteRecordCreateOrConnectWithoutVotacaoInput[]
    createMany?: VoteRecordCreateManyVotacaoInputEnvelope
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
  }

  export type ProposicaoUpdateOneWithoutVotacoesNestedInput = {
    create?: XOR<ProposicaoCreateWithoutVotacoesInput, ProposicaoUncheckedCreateWithoutVotacoesInput>
    connectOrCreate?: ProposicaoCreateOrConnectWithoutVotacoesInput
    upsert?: ProposicaoUpsertWithoutVotacoesInput
    disconnect?: ProposicaoWhereInput | boolean
    delete?: ProposicaoWhereInput | boolean
    connect?: ProposicaoWhereUniqueInput
    update?: XOR<XOR<ProposicaoUpdateToOneWithWhereWithoutVotacoesInput, ProposicaoUpdateWithoutVotacoesInput>, ProposicaoUncheckedUpdateWithoutVotacoesInput>
  }

  export type VoteRecordUpdateManyWithoutVotacaoNestedInput = {
    create?: XOR<VoteRecordCreateWithoutVotacaoInput, VoteRecordUncheckedCreateWithoutVotacaoInput> | VoteRecordCreateWithoutVotacaoInput[] | VoteRecordUncheckedCreateWithoutVotacaoInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutVotacaoInput | VoteRecordCreateOrConnectWithoutVotacaoInput[]
    upsert?: VoteRecordUpsertWithWhereUniqueWithoutVotacaoInput | VoteRecordUpsertWithWhereUniqueWithoutVotacaoInput[]
    createMany?: VoteRecordCreateManyVotacaoInputEnvelope
    set?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    disconnect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    delete?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    update?: VoteRecordUpdateWithWhereUniqueWithoutVotacaoInput | VoteRecordUpdateWithWhereUniqueWithoutVotacaoInput[]
    updateMany?: VoteRecordUpdateManyWithWhereWithoutVotacaoInput | VoteRecordUpdateManyWithWhereWithoutVotacaoInput[]
    deleteMany?: VoteRecordScalarWhereInput | VoteRecordScalarWhereInput[]
  }

  export type VoteRecordUncheckedUpdateManyWithoutVotacaoNestedInput = {
    create?: XOR<VoteRecordCreateWithoutVotacaoInput, VoteRecordUncheckedCreateWithoutVotacaoInput> | VoteRecordCreateWithoutVotacaoInput[] | VoteRecordUncheckedCreateWithoutVotacaoInput[]
    connectOrCreate?: VoteRecordCreateOrConnectWithoutVotacaoInput | VoteRecordCreateOrConnectWithoutVotacaoInput[]
    upsert?: VoteRecordUpsertWithWhereUniqueWithoutVotacaoInput | VoteRecordUpsertWithWhereUniqueWithoutVotacaoInput[]
    createMany?: VoteRecordCreateManyVotacaoInputEnvelope
    set?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    disconnect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    delete?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    connect?: VoteRecordWhereUniqueInput | VoteRecordWhereUniqueInput[]
    update?: VoteRecordUpdateWithWhereUniqueWithoutVotacaoInput | VoteRecordUpdateWithWhereUniqueWithoutVotacaoInput[]
    updateMany?: VoteRecordUpdateManyWithWhereWithoutVotacaoInput | VoteRecordUpdateManyWithWhereWithoutVotacaoInput[]
    deleteMany?: VoteRecordScalarWhereInput | VoteRecordScalarWhereInput[]
  }

  export type ParlamentarCreateNestedOneWithoutVotosInput = {
    create?: XOR<ParlamentarCreateWithoutVotosInput, ParlamentarUncheckedCreateWithoutVotosInput>
    connectOrCreate?: ParlamentarCreateOrConnectWithoutVotosInput
    connect?: ParlamentarWhereUniqueInput
  }

  export type VoteEventCreateNestedOneWithoutVotosInput = {
    create?: XOR<VoteEventCreateWithoutVotosInput, VoteEventUncheckedCreateWithoutVotosInput>
    connectOrCreate?: VoteEventCreateOrConnectWithoutVotosInput
    connect?: VoteEventWhereUniqueInput
  }

  export type ParlamentarUpdateOneRequiredWithoutVotosNestedInput = {
    create?: XOR<ParlamentarCreateWithoutVotosInput, ParlamentarUncheckedCreateWithoutVotosInput>
    connectOrCreate?: ParlamentarCreateOrConnectWithoutVotosInput
    upsert?: ParlamentarUpsertWithoutVotosInput
    connect?: ParlamentarWhereUniqueInput
    update?: XOR<XOR<ParlamentarUpdateToOneWithWhereWithoutVotosInput, ParlamentarUpdateWithoutVotosInput>, ParlamentarUncheckedUpdateWithoutVotosInput>
  }

  export type VoteEventUpdateOneRequiredWithoutVotosNestedInput = {
    create?: XOR<VoteEventCreateWithoutVotosInput, VoteEventUncheckedCreateWithoutVotosInput>
    connectOrCreate?: VoteEventCreateOrConnectWithoutVotosInput
    upsert?: VoteEventUpsertWithoutVotosInput
    connect?: VoteEventWhereUniqueInput
    update?: XOR<XOR<VoteEventUpdateToOneWithWhereWithoutVotosInput, VoteEventUpdateWithoutVotosInput>, VoteEventUncheckedUpdateWithoutVotosInput>
  }

  export type ParlamentarCreateNestedOneWithoutProposicoesInput = {
    create?: XOR<ParlamentarCreateWithoutProposicoesInput, ParlamentarUncheckedCreateWithoutProposicoesInput>
    connectOrCreate?: ParlamentarCreateOrConnectWithoutProposicoesInput
    connect?: ParlamentarWhereUniqueInput
  }

  export type VoteEventCreateNestedManyWithoutProposicaoInput = {
    create?: XOR<VoteEventCreateWithoutProposicaoInput, VoteEventUncheckedCreateWithoutProposicaoInput> | VoteEventCreateWithoutProposicaoInput[] | VoteEventUncheckedCreateWithoutProposicaoInput[]
    connectOrCreate?: VoteEventCreateOrConnectWithoutProposicaoInput | VoteEventCreateOrConnectWithoutProposicaoInput[]
    createMany?: VoteEventCreateManyProposicaoInputEnvelope
    connect?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
  }

  export type VoteEventUncheckedCreateNestedManyWithoutProposicaoInput = {
    create?: XOR<VoteEventCreateWithoutProposicaoInput, VoteEventUncheckedCreateWithoutProposicaoInput> | VoteEventCreateWithoutProposicaoInput[] | VoteEventUncheckedCreateWithoutProposicaoInput[]
    connectOrCreate?: VoteEventCreateOrConnectWithoutProposicaoInput | VoteEventCreateOrConnectWithoutProposicaoInput[]
    createMany?: VoteEventCreateManyProposicaoInputEnvelope
    connect?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
  }

  export type ParlamentarUpdateOneWithoutProposicoesNestedInput = {
    create?: XOR<ParlamentarCreateWithoutProposicoesInput, ParlamentarUncheckedCreateWithoutProposicoesInput>
    connectOrCreate?: ParlamentarCreateOrConnectWithoutProposicoesInput
    upsert?: ParlamentarUpsertWithoutProposicoesInput
    disconnect?: ParlamentarWhereInput | boolean
    delete?: ParlamentarWhereInput | boolean
    connect?: ParlamentarWhereUniqueInput
    update?: XOR<XOR<ParlamentarUpdateToOneWithWhereWithoutProposicoesInput, ParlamentarUpdateWithoutProposicoesInput>, ParlamentarUncheckedUpdateWithoutProposicoesInput>
  }

  export type VoteEventUpdateManyWithoutProposicaoNestedInput = {
    create?: XOR<VoteEventCreateWithoutProposicaoInput, VoteEventUncheckedCreateWithoutProposicaoInput> | VoteEventCreateWithoutProposicaoInput[] | VoteEventUncheckedCreateWithoutProposicaoInput[]
    connectOrCreate?: VoteEventCreateOrConnectWithoutProposicaoInput | VoteEventCreateOrConnectWithoutProposicaoInput[]
    upsert?: VoteEventUpsertWithWhereUniqueWithoutProposicaoInput | VoteEventUpsertWithWhereUniqueWithoutProposicaoInput[]
    createMany?: VoteEventCreateManyProposicaoInputEnvelope
    set?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    disconnect?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    delete?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    connect?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    update?: VoteEventUpdateWithWhereUniqueWithoutProposicaoInput | VoteEventUpdateWithWhereUniqueWithoutProposicaoInput[]
    updateMany?: VoteEventUpdateManyWithWhereWithoutProposicaoInput | VoteEventUpdateManyWithWhereWithoutProposicaoInput[]
    deleteMany?: VoteEventScalarWhereInput | VoteEventScalarWhereInput[]
  }

  export type VoteEventUncheckedUpdateManyWithoutProposicaoNestedInput = {
    create?: XOR<VoteEventCreateWithoutProposicaoInput, VoteEventUncheckedCreateWithoutProposicaoInput> | VoteEventCreateWithoutProposicaoInput[] | VoteEventUncheckedCreateWithoutProposicaoInput[]
    connectOrCreate?: VoteEventCreateOrConnectWithoutProposicaoInput | VoteEventCreateOrConnectWithoutProposicaoInput[]
    upsert?: VoteEventUpsertWithWhereUniqueWithoutProposicaoInput | VoteEventUpsertWithWhereUniqueWithoutProposicaoInput[]
    createMany?: VoteEventCreateManyProposicaoInputEnvelope
    set?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    disconnect?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    delete?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    connect?: VoteEventWhereUniqueInput | VoteEventWhereUniqueInput[]
    update?: VoteEventUpdateWithWhereUniqueWithoutProposicaoInput | VoteEventUpdateWithWhereUniqueWithoutProposicaoInput[]
    updateMany?: VoteEventUpdateManyWithWhereWithoutProposicaoInput | VoteEventUpdateManyWithWhereWithoutProposicaoInput[]
    deleteMany?: VoteEventScalarWhereInput | VoteEventScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VoteRecordCreateWithoutParlamentarInput = {
    id?: string
    voto: string
    data: Date | string
    createdAt?: Date | string
    votacao: VoteEventCreateNestedOneWithoutVotosInput
  }

  export type VoteRecordUncheckedCreateWithoutParlamentarInput = {
    id?: string
    voto: string
    votacaoId: string
    data: Date | string
    createdAt?: Date | string
  }

  export type VoteRecordCreateOrConnectWithoutParlamentarInput = {
    where: VoteRecordWhereUniqueInput
    create: XOR<VoteRecordCreateWithoutParlamentarInput, VoteRecordUncheckedCreateWithoutParlamentarInput>
  }

  export type VoteRecordCreateManyParlamentarInputEnvelope = {
    data: VoteRecordCreateManyParlamentarInput | VoteRecordCreateManyParlamentarInput[]
    skipDuplicates?: boolean
  }

  export type ProposicaoCreateWithoutAutorInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votacoes?: VoteEventCreateNestedManyWithoutProposicaoInput
  }

  export type ProposicaoUncheckedCreateWithoutAutorInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votacoes?: VoteEventUncheckedCreateNestedManyWithoutProposicaoInput
  }

  export type ProposicaoCreateOrConnectWithoutAutorInput = {
    where: ProposicaoWhereUniqueInput
    create: XOR<ProposicaoCreateWithoutAutorInput, ProposicaoUncheckedCreateWithoutAutorInput>
  }

  export type ProposicaoCreateManyAutorInputEnvelope = {
    data: ProposicaoCreateManyAutorInput | ProposicaoCreateManyAutorInput[]
    skipDuplicates?: boolean
  }

  export type VoteRecordUpsertWithWhereUniqueWithoutParlamentarInput = {
    where: VoteRecordWhereUniqueInput
    update: XOR<VoteRecordUpdateWithoutParlamentarInput, VoteRecordUncheckedUpdateWithoutParlamentarInput>
    create: XOR<VoteRecordCreateWithoutParlamentarInput, VoteRecordUncheckedCreateWithoutParlamentarInput>
  }

  export type VoteRecordUpdateWithWhereUniqueWithoutParlamentarInput = {
    where: VoteRecordWhereUniqueInput
    data: XOR<VoteRecordUpdateWithoutParlamentarInput, VoteRecordUncheckedUpdateWithoutParlamentarInput>
  }

  export type VoteRecordUpdateManyWithWhereWithoutParlamentarInput = {
    where: VoteRecordScalarWhereInput
    data: XOR<VoteRecordUpdateManyMutationInput, VoteRecordUncheckedUpdateManyWithoutParlamentarInput>
  }

  export type VoteRecordScalarWhereInput = {
    AND?: VoteRecordScalarWhereInput | VoteRecordScalarWhereInput[]
    OR?: VoteRecordScalarWhereInput[]
    NOT?: VoteRecordScalarWhereInput | VoteRecordScalarWhereInput[]
    id?: StringFilter<"VoteRecord"> | string
    voto?: StringFilter<"VoteRecord"> | string
    parlamentarId?: StringFilter<"VoteRecord"> | string
    votacaoId?: StringFilter<"VoteRecord"> | string
    data?: DateTimeFilter<"VoteRecord"> | Date | string
    createdAt?: DateTimeFilter<"VoteRecord"> | Date | string
  }

  export type ProposicaoUpsertWithWhereUniqueWithoutAutorInput = {
    where: ProposicaoWhereUniqueInput
    update: XOR<ProposicaoUpdateWithoutAutorInput, ProposicaoUncheckedUpdateWithoutAutorInput>
    create: XOR<ProposicaoCreateWithoutAutorInput, ProposicaoUncheckedCreateWithoutAutorInput>
  }

  export type ProposicaoUpdateWithWhereUniqueWithoutAutorInput = {
    where: ProposicaoWhereUniqueInput
    data: XOR<ProposicaoUpdateWithoutAutorInput, ProposicaoUncheckedUpdateWithoutAutorInput>
  }

  export type ProposicaoUpdateManyWithWhereWithoutAutorInput = {
    where: ProposicaoScalarWhereInput
    data: XOR<ProposicaoUpdateManyMutationInput, ProposicaoUncheckedUpdateManyWithoutAutorInput>
  }

  export type ProposicaoScalarWhereInput = {
    AND?: ProposicaoScalarWhereInput | ProposicaoScalarWhereInput[]
    OR?: ProposicaoScalarWhereInput[]
    NOT?: ProposicaoScalarWhereInput | ProposicaoScalarWhereInput[]
    id?: StringFilter<"Proposicao"> | string
    externalId?: IntFilter<"Proposicao"> | number
    tipo?: StringFilter<"Proposicao"> | string
    numero?: IntFilter<"Proposicao"> | number
    ano?: IntFilter<"Proposicao"> | number
    ementa?: StringFilter<"Proposicao"> | string
    dataApresentacao?: DateTimeFilter<"Proposicao"> | Date | string
    urlInteiro?: StringNullableFilter<"Proposicao"> | string | null
    camara?: StringFilter<"Proposicao"> | string
    autorId?: StringNullableFilter<"Proposicao"> | string | null
    syncedAt?: DateTimeFilter<"Proposicao"> | Date | string
    createdAt?: DateTimeFilter<"Proposicao"> | Date | string
    updatedAt?: DateTimeFilter<"Proposicao"> | Date | string
  }

  export type ProposicaoCreateWithoutVotacoesInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    autor?: ParlamentarCreateNestedOneWithoutProposicoesInput
  }

  export type ProposicaoUncheckedCreateWithoutVotacoesInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    autorId?: string | null
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProposicaoCreateOrConnectWithoutVotacoesInput = {
    where: ProposicaoWhereUniqueInput
    create: XOR<ProposicaoCreateWithoutVotacoesInput, ProposicaoUncheckedCreateWithoutVotacoesInput>
  }

  export type VoteRecordCreateWithoutVotacaoInput = {
    id?: string
    voto: string
    data: Date | string
    createdAt?: Date | string
    parlamentar: ParlamentarCreateNestedOneWithoutVotosInput
  }

  export type VoteRecordUncheckedCreateWithoutVotacaoInput = {
    id?: string
    voto: string
    parlamentarId: string
    data: Date | string
    createdAt?: Date | string
  }

  export type VoteRecordCreateOrConnectWithoutVotacaoInput = {
    where: VoteRecordWhereUniqueInput
    create: XOR<VoteRecordCreateWithoutVotacaoInput, VoteRecordUncheckedCreateWithoutVotacaoInput>
  }

  export type VoteRecordCreateManyVotacaoInputEnvelope = {
    data: VoteRecordCreateManyVotacaoInput | VoteRecordCreateManyVotacaoInput[]
    skipDuplicates?: boolean
  }

  export type ProposicaoUpsertWithoutVotacoesInput = {
    update: XOR<ProposicaoUpdateWithoutVotacoesInput, ProposicaoUncheckedUpdateWithoutVotacoesInput>
    create: XOR<ProposicaoCreateWithoutVotacoesInput, ProposicaoUncheckedCreateWithoutVotacoesInput>
    where?: ProposicaoWhereInput
  }

  export type ProposicaoUpdateToOneWithWhereWithoutVotacoesInput = {
    where?: ProposicaoWhereInput
    data: XOR<ProposicaoUpdateWithoutVotacoesInput, ProposicaoUncheckedUpdateWithoutVotacoesInput>
  }

  export type ProposicaoUpdateWithoutVotacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autor?: ParlamentarUpdateOneWithoutProposicoesNestedInput
  }

  export type ProposicaoUncheckedUpdateWithoutVotacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    autorId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordUpsertWithWhereUniqueWithoutVotacaoInput = {
    where: VoteRecordWhereUniqueInput
    update: XOR<VoteRecordUpdateWithoutVotacaoInput, VoteRecordUncheckedUpdateWithoutVotacaoInput>
    create: XOR<VoteRecordCreateWithoutVotacaoInput, VoteRecordUncheckedCreateWithoutVotacaoInput>
  }

  export type VoteRecordUpdateWithWhereUniqueWithoutVotacaoInput = {
    where: VoteRecordWhereUniqueInput
    data: XOR<VoteRecordUpdateWithoutVotacaoInput, VoteRecordUncheckedUpdateWithoutVotacaoInput>
  }

  export type VoteRecordUpdateManyWithWhereWithoutVotacaoInput = {
    where: VoteRecordScalarWhereInput
    data: XOR<VoteRecordUpdateManyMutationInput, VoteRecordUncheckedUpdateManyWithoutVotacaoInput>
  }

  export type ParlamentarCreateWithoutVotosInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    proposicoes?: ProposicaoCreateNestedManyWithoutAutorInput
  }

  export type ParlamentarUncheckedCreateWithoutVotosInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    proposicoes?: ProposicaoUncheckedCreateNestedManyWithoutAutorInput
  }

  export type ParlamentarCreateOrConnectWithoutVotosInput = {
    where: ParlamentarWhereUniqueInput
    create: XOR<ParlamentarCreateWithoutVotosInput, ParlamentarUncheckedCreateWithoutVotosInput>
  }

  export type VoteEventCreateWithoutVotosInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    proposicao?: ProposicaoCreateNestedOneWithoutVotacoesInput
  }

  export type VoteEventUncheckedCreateWithoutVotosInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    proposicaoId?: string | null
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoteEventCreateOrConnectWithoutVotosInput = {
    where: VoteEventWhereUniqueInput
    create: XOR<VoteEventCreateWithoutVotosInput, VoteEventUncheckedCreateWithoutVotosInput>
  }

  export type ParlamentarUpsertWithoutVotosInput = {
    update: XOR<ParlamentarUpdateWithoutVotosInput, ParlamentarUncheckedUpdateWithoutVotosInput>
    create: XOR<ParlamentarCreateWithoutVotosInput, ParlamentarUncheckedCreateWithoutVotosInput>
    where?: ParlamentarWhereInput
  }

  export type ParlamentarUpdateToOneWithWhereWithoutVotosInput = {
    where?: ParlamentarWhereInput
    data: XOR<ParlamentarUpdateWithoutVotosInput, ParlamentarUncheckedUpdateWithoutVotosInput>
  }

  export type ParlamentarUpdateWithoutVotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposicoes?: ProposicaoUpdateManyWithoutAutorNestedInput
  }

  export type ParlamentarUncheckedUpdateWithoutVotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposicoes?: ProposicaoUncheckedUpdateManyWithoutAutorNestedInput
  }

  export type VoteEventUpsertWithoutVotosInput = {
    update: XOR<VoteEventUpdateWithoutVotosInput, VoteEventUncheckedUpdateWithoutVotosInput>
    create: XOR<VoteEventCreateWithoutVotosInput, VoteEventUncheckedCreateWithoutVotosInput>
    where?: VoteEventWhereInput
  }

  export type VoteEventUpdateToOneWithWhereWithoutVotosInput = {
    where?: VoteEventWhereInput
    data: XOR<VoteEventUpdateWithoutVotosInput, VoteEventUncheckedUpdateWithoutVotosInput>
  }

  export type VoteEventUpdateWithoutVotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposicao?: ProposicaoUpdateOneWithoutVotacoesNestedInput
  }

  export type VoteEventUncheckedUpdateWithoutVotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    proposicaoId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParlamentarCreateWithoutProposicoesInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordCreateNestedManyWithoutParlamentarInput
  }

  export type ParlamentarUncheckedCreateWithoutProposicoesInput = {
    id: string
    idOriginal: number
    camara: string
    nome: string
    nomeCompleto: string
    partido: string
    uf: string
    foto: string
    slug: string
    email?: string | null
    legislatura?: number
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordUncheckedCreateNestedManyWithoutParlamentarInput
  }

  export type ParlamentarCreateOrConnectWithoutProposicoesInput = {
    where: ParlamentarWhereUniqueInput
    create: XOR<ParlamentarCreateWithoutProposicoesInput, ParlamentarUncheckedCreateWithoutProposicoesInput>
  }

  export type VoteEventCreateWithoutProposicaoInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordCreateNestedManyWithoutVotacaoInput
  }

  export type VoteEventUncheckedCreateWithoutProposicaoInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    votos?: VoteRecordUncheckedCreateNestedManyWithoutVotacaoInput
  }

  export type VoteEventCreateOrConnectWithoutProposicaoInput = {
    where: VoteEventWhereUniqueInput
    create: XOR<VoteEventCreateWithoutProposicaoInput, VoteEventUncheckedCreateWithoutProposicaoInput>
  }

  export type VoteEventCreateManyProposicaoInputEnvelope = {
    data: VoteEventCreateManyProposicaoInput | VoteEventCreateManyProposicaoInput[]
    skipDuplicates?: boolean
  }

  export type ParlamentarUpsertWithoutProposicoesInput = {
    update: XOR<ParlamentarUpdateWithoutProposicoesInput, ParlamentarUncheckedUpdateWithoutProposicoesInput>
    create: XOR<ParlamentarCreateWithoutProposicoesInput, ParlamentarUncheckedCreateWithoutProposicoesInput>
    where?: ParlamentarWhereInput
  }

  export type ParlamentarUpdateToOneWithWhereWithoutProposicoesInput = {
    where?: ParlamentarWhereInput
    data: XOR<ParlamentarUpdateWithoutProposicoesInput, ParlamentarUncheckedUpdateWithoutProposicoesInput>
  }

  export type ParlamentarUpdateWithoutProposicoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUpdateManyWithoutParlamentarNestedInput
  }

  export type ParlamentarUncheckedUpdateWithoutProposicoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    idOriginal?: IntFieldUpdateOperationsInput | number
    camara?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    nomeCompleto?: StringFieldUpdateOperationsInput | string
    partido?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    legislatura?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUncheckedUpdateManyWithoutParlamentarNestedInput
  }

  export type VoteEventUpsertWithWhereUniqueWithoutProposicaoInput = {
    where: VoteEventWhereUniqueInput
    update: XOR<VoteEventUpdateWithoutProposicaoInput, VoteEventUncheckedUpdateWithoutProposicaoInput>
    create: XOR<VoteEventCreateWithoutProposicaoInput, VoteEventUncheckedCreateWithoutProposicaoInput>
  }

  export type VoteEventUpdateWithWhereUniqueWithoutProposicaoInput = {
    where: VoteEventWhereUniqueInput
    data: XOR<VoteEventUpdateWithoutProposicaoInput, VoteEventUncheckedUpdateWithoutProposicaoInput>
  }

  export type VoteEventUpdateManyWithWhereWithoutProposicaoInput = {
    where: VoteEventScalarWhereInput
    data: XOR<VoteEventUpdateManyMutationInput, VoteEventUncheckedUpdateManyWithoutProposicaoInput>
  }

  export type VoteEventScalarWhereInput = {
    AND?: VoteEventScalarWhereInput | VoteEventScalarWhereInput[]
    OR?: VoteEventScalarWhereInput[]
    NOT?: VoteEventScalarWhereInput | VoteEventScalarWhereInput[]
    id?: StringFilter<"VoteEvent"> | string
    externalId?: StringFilter<"VoteEvent"> | string
    data?: DateTimeFilter<"VoteEvent"> | Date | string
    descricao?: StringFilter<"VoteEvent"> | string
    resultado?: StringNullableFilter<"VoteEvent"> | string | null
    camara?: StringFilter<"VoteEvent"> | string
    proposicaoId?: StringNullableFilter<"VoteEvent"> | string | null
    syncedAt?: DateTimeFilter<"VoteEvent"> | Date | string
    createdAt?: DateTimeFilter<"VoteEvent"> | Date | string
    updatedAt?: DateTimeFilter<"VoteEvent"> | Date | string
  }

  export type VoteRecordCreateManyParlamentarInput = {
    id?: string
    voto: string
    votacaoId: string
    data: Date | string
    createdAt?: Date | string
  }

  export type ProposicaoCreateManyAutorInput = {
    id?: string
    externalId: number
    tipo: string
    numero: number
    ano: number
    ementa: string
    dataApresentacao: Date | string
    urlInteiro?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoteRecordUpdateWithoutParlamentarInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votacao?: VoteEventUpdateOneRequiredWithoutVotosNestedInput
  }

  export type VoteRecordUncheckedUpdateWithoutParlamentarInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    votacaoId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordUncheckedUpdateManyWithoutParlamentarInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    votacaoId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposicaoUpdateWithoutAutorInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votacoes?: VoteEventUpdateManyWithoutProposicaoNestedInput
  }

  export type ProposicaoUncheckedUpdateWithoutAutorInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votacoes?: VoteEventUncheckedUpdateManyWithoutProposicaoNestedInput
  }

  export type ProposicaoUncheckedUpdateManyWithoutAutorInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    ementa?: StringFieldUpdateOperationsInput | string
    dataApresentacao?: DateTimeFieldUpdateOperationsInput | Date | string
    urlInteiro?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordCreateManyVotacaoInput = {
    id?: string
    voto: string
    parlamentarId: string
    data: Date | string
    createdAt?: Date | string
  }

  export type VoteRecordUpdateWithoutVotacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parlamentar?: ParlamentarUpdateOneRequiredWithoutVotosNestedInput
  }

  export type VoteRecordUncheckedUpdateWithoutVotacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    parlamentarId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteRecordUncheckedUpdateManyWithoutVotacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    voto?: StringFieldUpdateOperationsInput | string
    parlamentarId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteEventCreateManyProposicaoInput = {
    id?: string
    externalId: string
    data: Date | string
    descricao: string
    resultado?: string | null
    camara: string
    syncedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoteEventUpdateWithoutProposicaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUpdateManyWithoutVotacaoNestedInput
  }

  export type VoteEventUncheckedUpdateWithoutProposicaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votos?: VoteRecordUncheckedUpdateManyWithoutVotacaoNestedInput
  }

  export type VoteEventUncheckedUpdateManyWithoutProposicaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    descricao?: StringFieldUpdateOperationsInput | string
    resultado?: NullableStringFieldUpdateOperationsInput | string | null
    camara?: StringFieldUpdateOperationsInput | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}