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
  public type CreateUser = {
    firstName: Text;
    lastName: Text;
    phone: Text;
    email: Text;
  };

  public type CompleteAgentBio = {
    profilePicture: Blob;
    businessRegNo: Text;
    postalCode: ?Text;
    country: Text;
    cityName: Text;
    stateCode: Text;
    address: Text;
    latitude: ?Float;
    longitude: ?Float;
    deviceId: ?Text;
  };
};