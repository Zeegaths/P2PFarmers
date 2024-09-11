import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Vector "mo:vector";
import JSON "mo:json.mo";
import Map "mo:map/Map";

module {
  public type Vector<T> = Vector.Vector<T>;
  public type Result<A, B> = Result.Result<A, B>;

  public let INVALID_CANISTER_ID = "invalid!canister!id";

  public type Agent = {
    id : Text;
    firstName : Text;
    lastName : Text;
    phone : Text;
    email: Text;
    profilePicture: ?Blob;
    businessRegNo: ?Text;
    deviceId: ?Text;
    postalCode: ?Text;
    country: ?Text;
    cityName: ?Text;
    stateCode: ?Text;
    address: ?Text;
    latitude: ?Float;
    longitude: ?Float;
    farms: Map.Map<Text, (Farmer, Farm)>;
  };

  public type Buyer = {
    id : Text;
    firstName : Text;
    lastName : Text;
    phone : Text;
    email: Text;
    profilePicture: ?Blob;
    businessRegNo: ?Text;
    businessName: ?Text;
    deviceId: ?Text;
    postalCode: ?Text;
    country: ?Text;
    cityName: ?Text;
    stateCode: ?Text;
    address: ?Text;
    latitude: ?Float;
    longitude: ?Float;
  };
  
  public type Farmer = {
    id : Text;
    firstName : Text;
    lastName : Text;
    phone : Text;
    email: ?Text;
    profilePicture: ?Blob;
    businessRegNo: ?Text;
    businessName: ?Text;
    farmId: ?Nat;
  };

  public type Farm = {
    id: Text;
    farmerId: Nat;
    agentId: Nat;
    postalCode: ?Text;
    country: Text;
    cityName: Text;
    stateCode: Text;
    address: Text;
    latitude: Float;
    longitude: Float;
    category: Text;
    subCategory: Text;
    description: Text;
    agentRate: Float;
    products: Vector<Product>;
  };

  public type Product = {
    id: Text;
    name: Text;
    kind: Text;
    price: Float;
    image: Blob;
    quantity: Nat;
    weight: Float;
  };

  // HTTP Request types
  public type Timestamp = Nat64;

  public type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    headers : [HttpHeader];
    body : ?[Nat8];
    method : HttpMethod;
    transform : ?TransformRawResponseFunction;
  };

  public type HttpHeader = {
    name : Text;
    value : Text;
  };

  public type HttpMethod = {
    #get;
    #post;
    #head;
  };

  public type HttpResponsePayload = {
    status : Nat;
    headers : [HttpHeader];
    body : [Nat8];
  };

  public type HttpReponse = {
    status : Nat;
    body : JSON.JSON;
  };

  public type TransformFn = shared query TransformArgs -> async HttpResponsePayload;

  public type TransformRawResponseFunction = {
    function : TransformFn;
    context : Blob;
  };

  public type TransformArgs = {
    response : HttpResponsePayload;
    context : Blob;
  };

  public type CanisterHttpResponsePayload = {
    status : Nat;
    headers : [HttpHeader];
    body : [Nat8];
  };

  public type TransformContext = {
    function : TransformFn;
    context : Blob;
  };

  public type IC = actor {
    http_request : HttpRequestArgs -> async HttpResponsePayload;
  };
};
