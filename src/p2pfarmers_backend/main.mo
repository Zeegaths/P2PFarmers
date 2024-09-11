import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Types "types";
import Dto "dtos";
import Map "mo:map/Map";
import { hash } "mo:base/Hash";
import { phash; thash; nhash } "mo:map/Map";
import Vector "mo:vector";
import Debug "mo:base/Debug";
import Utils "utils";

shared ({ caller }) actor class Backend() {
  type Result<A, B> = Types.Result<A, B>;
  type Agent = Types.Agent;
  type Buyer = Types.Buyer;
  type Farmer = Types.Farmer;
  type Farm = Types.Farm;
  type Product = Types.Product;
  type User = Types.User;

  stable var acls = Vector.new<Principal>();
  stable let members = Map.new<Principal, User>();

  stable var owner = caller;

  // Check if principal is owner
  private func _isOwner(p : Principal) : Bool {
    Debug.print(Principal.toText(owner));
    Debug.print(Principal.toText(p));
    Debug.print(debug_show (Principal.toText(p) == Principal.toText(owner)));
    Principal.equal(owner, p);
  };

  // Check if principal is allowed
  private func _isAllowed(p : Principal) : Bool {
    if (_isOwner(p)) {
      return true;
    };
    for (k in Vector.vals(acls)) {
      if (Principal.equal(p, k)) {
        return true;
      };
    };
    return false;
  };

  // Get acls
  public query func getAcls() : async [Principal] {
    Vector.toArray(acls);
  };

  // Get owner
  public query func getOwner() : async Principal {
    owner;
  };

  // Add acls
  public shared ({ caller }) func addAcls(p : Principal) : () {
    assert _isOwner(caller);
    Vector.add(acls, p);
  };

  // Remove acls
  public shared ({ caller }) func removeAcls(p : Principal) : async Result<(), Text> {
    assert _isOwner(caller);
    let newAcls = Vector.new<Principal>();
    if (Vector.contains<Principal>(acls, p, Principal.equal) == false) {
      return #err("Principal not found");
    };
    for (k in Vector.vals(acls)) {
      if (Principal.notEqual(p, k)) {
        Vector.add(newAcls, k);
      };
    };
    acls := newAcls;
    #ok();
  };

  public shared ({ caller }) func registerAgent(data : Dto.CreateAgent) : async Result<Text, Text> {
    let user = Map.get(members, phash, caller);
    switch (user) {
      case (?_) {
        return #err("User already registered");
      };
      case (null) {
        let newAgent : Agent = {
          id = await Utils.uuid();
          firstName = data.firstName;
          lastName = data.lastName;
          phone = data.phone;
          email = data.email;
          address = data.address;
          businessRegNo = data.businessRegNo;
          deviceId = null;
          postalCode = data.postalCode;
          country = data.country;
          cityName = data.cityName;
          stateCode = data.stateCode;
          latitude = null;
          longitude = null;
          profilePicture = data.profilePicture;
          farms = Map.new<Text, (Farmer, Farm)>();
        };
        Map.set(members, phash, caller, #Agent(newAgent));
        #ok(newAgent.id);
      };
    };
  };

  public shared ({ caller }) func registerBuyer(data : Dto.CreateBuyer) : async Result<Text, Text> {
    let user = Map.get(members, phash, caller);
    switch (user) {
      case (?_) {
        return #err("User already registered");
      };
      case (null) {
        let newUser : Buyer = {
          id = await Utils.uuid();
          firstName = data.firstName;
          lastName = data.lastName;
          phone = data.phone;
          email = data.email;
          address = data.address;
          businessRegNo = data.businessRegNo;
          businessName = data.businessName;
          deviceId = null;
          postalCode = data.postalCode;
          country = data.country;
          cityName = data.cityName;
          stateCode = data.stateCode;
          latitude = null;
          longitude = null;
          profilePicture = data.profilePicture;
        };
        Map.set(members, phash, caller, #Buyer(newUser));
        #ok(newUser.id);
      };
    };
  };

  // Get user profile
  public query func getProfile(caller: Principal) : async Result<Dto.User, Text> {
    let user = Map.get(members, phash, caller);
    switch (user) {
      case (?member) {
        switch (member) {
          case (#Agent(agent)) {
            let sharedAgent = {
              id = agent.id;
              firstName = agent.firstName;
              lastName = agent.lastName;
              phone = agent.phone;
              email = agent.email;
              address = agent.address;
              businessRegNo = agent.businessRegNo;
              deviceId = agent.deviceId;
              postalCode = agent.postalCode;
              country = agent.country;
              cityName = agent.cityName;
              stateCode = agent.stateCode;
              latitude = agent.latitude;
              longitude = agent.longitude;
              profilePicture = agent.profilePicture;
            };
            #ok(#Agent(sharedAgent));
          };
          case (#Buyer(buyer)) {
            #ok(#Buyer(buyer));
          };
        };
      };
      case (null) {
        #err("User not found");
      };
    };
  };
};
