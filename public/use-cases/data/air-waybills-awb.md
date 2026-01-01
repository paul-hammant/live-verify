---
title: "Air Waybills (AWB)"
category: "Shipping & Freight"
volume: "Large"
retention: "7-10 years (proof of shipment)"
slug: "air-waybills-awb"
tags: ["air", "waybill", "awb", "logistics", "freight", "iata", "cargo"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="border-bottom: 2px solid #000; padding: 5px; display: flex; justify-content: space-between;">
    <div style="font-weight: bold; font-size: 1.2em;">016-12345678</div>
    <div style="font-weight: bold;">UNITED AIRLINES</div>
    <div style="font-weight: bold;">SFO</div>
  </div>

  <div style="padding: 10px; font-size: 0.85em;">
    <div style="display: flex; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #000; padding-right: 5px;">
        <strong>Shipper:</strong><br>
        <span data-bracket="start" data-for="awb">]</span>Global Tech Exports, Inc.<br>
        400 Silicon Valley Blvd<br>
        San Jose, CA 95134
      </div>
      <div style="width: 50%; padding-left: 5px;">
        <strong>Consignee:</strong><br>
        EuroGadget GmbH<br>
        Flughafenstr. 1<br>
        Frankfurt, DE 60549
      </div>
    </div>

    <table style="width: 100%; border: 1px solid #000; border-collapse: collapse; margin-top: 10px;">
      <tr style="background: #eee;">
        <th style="border: 1px solid #000;">Pcs</th>
        <th style="border: 1px solid #000;">Gross Wt</th>
        <th style="border: 1px solid #000;">Chargeable</th>
        <th style="border: 1px solid #000;">Nature of Goods</th>
      </tr>
      <tr>
        <td style="border: 1px solid #000; text-align: center;">10</td>
        <td style="border: 1px solid #000; text-align: center;">500 kg</td>
        <td style="border: 1px solid #000; text-align: center;">500 kg</td>
        <td style="border: 1px solid #000;">Electronic Components<br>(Lithium Ion Batteries)</td>
      </tr>
    </table>

    <div style="margin-top: 10px;">
      <strong>Flight/Date:</strong> UA926 / 15MAR26<br>
      <strong>Executed on:</strong> 14MAR26 at SFO by Agent: Expeditors
    </div>

    <div data-verify-line="awb" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Airline doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:unitedcargo.com/awb/v/x9y8z7 <span data-bracket="end" data-for="awb">]</span>
    </div>
  </div>
</div>

## Data Verified

AWB Number (Master or House), shipper, consignee, pieces, weight, nature of goods, flight details, execution date, carrier signature.

**Document Types:**
- **Master Air Waybill (MAWB):** Issued by airline to freight forwarder.
- **House Air Waybill (HAWB):** Issued by forwarder to actual shipper.
- **e-AWB Receipt:** Printed copy of electronic record.

## Data Visible After Verification

Shows the issuer domain (Airline or Freight Forwarder) and shipment status.

**Status Indications:**
- **Booked** — Shipment registered but not yet received.
- **Received** — Cargo physically with carrier (RCS status).
- **Departed** — Cargo en route (DEP status).
- **Delivered** — Handed over to consignee (DLV status).

## Second-Party Use

The **Shipper** or **Consignee** benefits from verification.

**Proof of Shipment:** Sellers need to prove to buyers (and banks for Letters of Credit) that goods were actually handed over to the airline. A verified AWB is the "Golden Key" for unlocking payment.

**Customs Clearance:** Importers in the destination country present the AWB to Customs. Verification ensures the value/weight matches what was declared to the airline, preventing "double invoicing" fraud.

## Third-Party Use

**Customs Authorities**
**Risk Targeting:** Customs can verify the AWB data against the carrier's manifest *before* the plane lands. Discrepancies (e.g., AWB says "Books", manifest says "Electronics") trigger inspections.

**Insurance Companies**
**Cargo Claims:** When goods are lost/damaged, insurers verify the AWB to confirm the weight and nature of goods declared. If the shipper declared 50kg but claims for 500kg, verification catches the fraud.

**Truckers / Ground Handlers**
**Pickup Authority:** To prevent "fictitious pickup" (thieves posing as truckers), warehouses can verify the AWB presented by the driver matches the electronic release order.

## Verification Architecture

**The "Fake Waybill" Fraud Problem**

- **Ghost Shipments:** Creating a fake AWB to claim payment from a buyer or bank (Trade Finance fraud) when no goods were shipped.
- **Weight Fraud:** Declaring low weight to airline to save freight costs, but high weight to customer to charge more.
- **Illegal Exports:** Mislabeling dangerous goods (batteries, chemicals) as "General Cargo" on the paper AWB to bypass safety checks.

**Issuer Types**

**Airlines:** (United Cargo, Lufthansa Cargo, etc.)
**Freight Forwarders:** (DHL Global Forwarding, Kuehne+Nagel, etc.)

## Competition vs. e-AWB (Electronic Air Waybill)

| Feature | OCR-to-Hash | e-AWB (IATA) |
| :--- | :--- | :--- |
| **Adoption** | **Universal.** Works even for small forwarders/airlines not fully integrated. | **High but not 100%.** Many lanes/countries still require paper. |
| **Physical Handoff** | **Strong.** Verifies the paper accompanying the freight in the truck. | **Weak.** Truckers often don't have access to the e-AWB system; they carry paper. |
| **Interoperability** | **Web-based.** Anyone (bank, insurer, customs) can verify. | **Siloed.** Cargo Community Systems (CCS) require membership/login. |
| **Data Integrity** | **Snapshot.** Proves what was printed at origin. | **Dynamic.** System data updates; audit trail of changes can be complex. |

**Why OCR wins here:** Despite the push for e-AWB, paper persists in the "Last Mile" (trucking to/from airport) and in customs procedures of developing nations. OCR-to-hash turns that persistent paper into a trusted digital pointer, bridging the gap until 100% global digitization is achieved (which is decades away).
