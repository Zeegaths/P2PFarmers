import Text "mo:base/Text";
import Result "mo:base/Result";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

module Utils {
  type Result<A, B> = Result.Result<A, B>;

  public func uuid() : async Text {
    let g = Source.Source();
    UUID.toText(await g.new());
  };
};
