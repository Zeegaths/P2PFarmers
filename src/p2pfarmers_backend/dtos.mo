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
  public type CreateAgent = {
    firstName: Text;
    lastName: Text;
    phone: Text;
    email: Text;
    businessRegNo: Text;
    postalCode: Text;
    country: Text;
    cityName: Text;
    stateCode: Text;
    address: Text;
    profilePicture: Blob;
  };

  public type CreateBuyer = {
    firstName: Text;
    lastName: Text;
    phone: Text;
    email: Text;
    businessRegNo: Text;
    postalCode: Text;
    country: Text;
    cityName: Text;
    stateCode: Text;
    address: Text;
    businessName: Text;
    profilePicture: Blob;
  };

  public type CompleteAgentBio = {
    latitude: ?Float;
    longitude: ?Float;
    deviceId: ?Text;
  };
};