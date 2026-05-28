export async function POST(req) {
  try {
    const body = await req.json();

    const {
      address,
      propertyType,
      bedrooms,
      epcRating,
      floorArea,
      heatingType,
      annualEnergyBill
    } = body;

    const estimatedSavings =
      Math.round(Number(annualEnergyBill || 0) * 0.35);

    const estimatedROI =
      Math.round((estimatedSavings / 12000) * 100);

    const report = {
      success: true,
      property: {
        address,
        propertyType,
        bedrooms,
        epcRating,
        floorArea,
        heatingType
      },
      results: {
        annualSavings: estimatedSavings,
        roi: estimatedROI,
        carbonReduction: Math.round(floorArea * 12),
        recommendation:
          "Recommended upgrades include insulation improvements, smart heating optimisation, solar integration, and HVAC efficiency enhancements."
      }
    };

    return Response.json(report);

  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
